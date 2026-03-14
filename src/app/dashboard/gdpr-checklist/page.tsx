"use client";

import { useState, useEffect } from "react";
import { makeStyles, tokens, Text, Checkbox } from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";

const useStyles = makeStyles({
  progress: {
    marginBottom: "24px",
    padding: "16px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  progressBar: {
    height: "8px",
    borderRadius: "4px",
    backgroundColor: tokens.colorNeutralBackground4,
    overflow: "hidden",
    marginTop: "8px",
  },
  progressFill: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  section: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: "12px",
    padding: "8px 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  checkItem: {
    padding: "8px 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  checkLabel: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  checkDesc: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    marginLeft: "32px",
  },
});

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  section: string;
}

const checklistItems: ChecklistItem[] = [
  { id: "gdpr-01", section: "Dokumentation", label: "Verarbeitungsverzeichnis erstellt (Art. 30 DSGVO)", description: "Vollständiges Verzeichnis aller Datenverarbeitungstätigkeiten liegt vor" },
  { id: "gdpr-02", section: "Dokumentation", label: "Datenschutzbeauftragter benannt", description: "DSB ist benannt und bei der Aufsichtsbehörde gemeldet" },
  { id: "gdpr-03", section: "Dokumentation", label: "Datenschutz-Folgenabschätzung durchgeführt", description: "DSFA für risikoreiche Verarbeitungen dokumentiert" },
  { id: "gdpr-04", section: "Verträge", label: "Auftragsverarbeitungsverträge abgeschlossen", description: "AVV mit allen Dienstleistern (inkl. Microsoft) vorhanden" },
  { id: "gdpr-05", section: "Verträge", label: "Standardvertragsklauseln für Drittländer", description: "SCCs für Datenübermittlung in Nicht-EU-Länder implementiert" },
  { id: "gdpr-06", section: "Technisch", label: "Verschlüsselung at rest aktiviert", description: "BitLocker/FileVault auf allen Geräten, SharePoint-Verschlüsselung aktiv" },
  { id: "gdpr-07", section: "Technisch", label: "Verschlüsselung in transit sichergestellt", description: "TLS 1.2+ für alle Verbindungen erzwungen" },
  { id: "gdpr-08", section: "Technisch", label: "Zugriffskontrollen implementiert", description: "Rollenbasierte Zugriffskontrolle und Conditional Access konfiguriert" },
  { id: "gdpr-09", section: "Technisch", label: "Löschkonzept implementiert", description: "Retention Policies und automatische Datenlöschung konfiguriert" },
  { id: "gdpr-10", section: "Technisch", label: "Audit-Protokollierung aktiviert", description: "Umfassende Protokollierung aller Zugriffe und Änderungen" },
  { id: "gdpr-11", section: "Organisatorisch", label: "Mitarbeiter-Schulungen durchgeführt", description: "Regelmäßige Datenschutz-Schulungen dokumentiert" },
  { id: "gdpr-12", section: "Organisatorisch", label: "Datenschutzerklärung aktuell", description: "Datenschutzerklärung entspricht aktuellen Anforderungen" },
  { id: "gdpr-13", section: "Organisatorisch", label: "Meldeprozess für Datenpannen definiert", description: "72-Stunden-Meldefrist und Prozess dokumentiert" },
  { id: "gdpr-14", section: "Organisatorisch", label: "Betroffenenrechte-Prozess implementiert", description: "Auskunft, Löschung, Übertragbarkeit — Prozesse definiert" },
];

export default function GdprChecklistPage() {
  const styles = useStyles();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("gdpr-checklist");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  const handleToggle = (id: string) => {
    const updated = { ...checked, [id]: !checked[id] };
    setChecked(updated);
    localStorage.setItem("gdpr-checklist", JSON.stringify(updated));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const percentage = Math.round((completedCount / checklistItems.length) * 100);
  const sections = [...new Set(checklistItems.map((i) => i.section))];

  return (
    <>
      <PageHeader
        title="DSGVO Checkliste"
        description="Überprüfung der DSGVO-Konformität für Microsoft 365"
      />

      <div className={styles.progress}>
        <Text weight="semibold" size={300}>
          Fortschritt: {completedCount} von {checklistItems.length} ({percentage}%)
        </Text>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${percentage}%`,
              backgroundColor: percentage >= 80 ? "#4CAF50" : percentage >= 50 ? "#FF9800" : "#F44336",
            }}
          />
        </div>
      </div>

      {sections.map((section) => (
        <div key={section} className={styles.section}>
          <Text className={styles.sectionTitle} size={400} block>
            {section}
          </Text>
          {checklistItems
            .filter((item) => item.section === section)
            .map((item) => (
              <div key={item.id} className={styles.checkItem}>
                <Checkbox
                  checked={!!checked[item.id]}
                  onChange={() => handleToggle(item.id)}
                  label={item.label}
                />
                <Text className={styles.checkDesc} block>
                  {item.description}
                </Text>
              </div>
            ))}
        </div>
      ))}
    </>
  );
}
