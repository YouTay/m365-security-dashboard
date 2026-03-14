"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens,
  Text,
  Button,
  Badge,
  Card,
} from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  DocumentPdf24Regular,
  DocumentTable24Regular,
  ArrowDownload24Regular,
  CheckmarkCircle24Filled,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  exportCard: {
    padding: "24px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  exportHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  exportIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  exportInfo: {
    flex: 1,
  },
  includes: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  includeItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
  },
  checkIcon: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "16px",
  },
  exported: {
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: tokens.colorPaletteGreenBackground1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: tokens.colorPaletteGreenForeground1,
  },
});

export default function ReportExportPage() {
  const styles = useStyles();
  const [exported, setExported] = useState<Record<string, boolean>>({});

  const handleExport = (type: string) => {
    setExported((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setExported((prev) => ({ ...prev, [type]: false }));
    }, 3000);
  };

  const reports = [
    {
      id: "security-overview",
      title: "Sicherheitsübersicht",
      description: "Kompletter Bericht über den Sicherheitsstatus des Tenants",
      format: "PDF",
      icon: <DocumentPdf24Regular />,
      includes: [
        "Microsoft Secure Score Übersicht",
        "Kategorie-Breakdown",
        "Aktive Sicherheitswarnungen",
        "Empfohlene Maßnahmen",
      ],
    },
    {
      id: "user-report",
      title: "Benutzer-Sicherheitsbericht",
      description: "Details zu MFA-Status, Adminrollen und Risiko-Benutzern",
      format: "CSV",
      icon: <DocumentTable24Regular />,
      includes: [
        "Alle Benutzer mit MFA-Status",
        "Rollenübersicht",
        "Risiko-Benutzer",
        "Letzte Anmeldezeiten",
      ],
    },
    {
      id: "compliance-report",
      title: "Compliance-Bericht",
      description: "DSGVO-Checkliste und Conditional Access Policy-Übersicht",
      format: "PDF",
      icon: <DocumentPdf24Regular />,
      includes: [
        "DSGVO-Checkliste Status",
        "Conditional Access Policies",
        "Audit-Log Zusammenfassung",
        "Handlungsempfehlungen",
      ],
    },
    {
      id: "device-report",
      title: "Geräte-Compliance-Bericht",
      description: "Intune-Gerätestatus und Verschlüsselungsübersicht",
      format: "CSV",
      icon: <DocumentTable24Regular />,
      includes: [
        "Alle verwalteten Geräte",
        "Compliance-Status",
        "Verschlüsselungsstatus",
        "Betriebssystem-Versionen",
      ],
    },
  ];

  return (
    <>
      <PageHeader
        title="Report Export"
        description="Sicherheitsberichte als PDF oder CSV exportieren"
      />

      <div className={styles.grid}>
        {reports.map((report) => (
          <div key={report.id} className={styles.exportCard}>
            <div className={styles.exportHeader}>
              <div className={styles.exportIcon}>{report.icon}</div>
              <div className={styles.exportInfo}>
                <Text weight="bold" size={400} block>
                  {report.title}
                </Text>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                  {report.description}
                </Text>
              </div>
              <Badge size="small" appearance="outline" color="informative">
                {report.format}
              </Badge>
            </div>

            <div className={styles.includes}>
              {report.includes.map((item) => (
                <div key={item} className={styles.includeItem}>
                  <CheckmarkCircle24Filled className={styles.checkIcon} />
                  {item}
                </div>
              ))}
            </div>

            {exported[report.id] ? (
              <div className={styles.exported}>
                <CheckmarkCircle24Filled /> Export erfolgreich!
              </div>
            ) : (
              <Button
                appearance="primary"
                icon={<ArrowDownload24Regular />}
                onClick={() => handleExport(report.id)}
              >
                Als {report.format} exportieren
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
