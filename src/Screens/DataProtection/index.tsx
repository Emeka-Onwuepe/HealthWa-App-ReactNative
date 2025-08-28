import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import PageHeader from "../../components/ui/PageHeader";

export default function DataProtection() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <PageHeader title="Data Protection" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.mainTitle}>
            Your Commitment to Patient Confidentiality and Security in HealthWa
          </Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>1. Secure Data Encryption</Text>
            <Text style={styles.sectionText}>
              All patient data, including medical records, messages, and test
              results, is encrypted using AES-256 encryption during transmission
              and storage. This ensures that sensitive information remains
              inaccessible to unauthorized parties.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>2. Access Control</Text>
            <Text style={styles.sectionText}>
              Only authorized personnel, such as you and your clinical team, can
              access patient data. Multi-factor authentication (MFA) adds an
              extra layer of security to prevent unauthorized logins.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>3. HIPAA Compliance</Text>
            <Text style={styles.sectionText}>
              HealthWa adheres to HIPAA regulations and other global healthcare
              privacy standards, ensuring that all patient information is
              handled with the highest level of confidentiality and care.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>4. Regular Security Audits</Text>
            <Text style={styles.sectionText}>
              We conduct routine audits and vulnerability assessments to
              identify and address potential risks. Our systems are continuously
              updated to protect against emerging threats.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>5. Data Backup & Recovery</Text>
            <Text style={styles.sectionText}>
              Patient data is automatically backed up in secure, geo-redundant
              servers. In the event of an unexpected issue, we provide reliable
              data recovery to ensure no critical information is lost.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>6. Confidential Messaging</Text>
            <Text style={styles.sectionText}>
              The "Patient Chat" feature uses end-to-end encryption, ensuring
              that all communications between you and your patients remain
              private and tamper-proof.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>7. User Responsibility</Text>
            <Text style={styles.sectionText}>
              As a doctor, you play a key role in safeguarding patient data.
              Always log out after use, avoid sharing login credentials, and
              report suspicious activity immediately through the "Report Issue"
              feature.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>8. Patient Consent</Text>
            <Text style={styles.sectionText}>
              Patients must provide consent before their data is shared or
              accessed. You can view and manage consent preferences under the
              "Patient Profile" section.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>9. Anonymous Reporting</Text>
            <Text style={styles.sectionText}>
              If you suspect a breach or have concerns about data security, use
              the "Anonymous Reporting Tool" in the app to notify our security
              team discreetly.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Your trust is our priority. With HealthWa, you can focus on
              delivering exceptional care while we handle the security of your
              patients' data.
            </Text>
            <Text style={styles.footerText}>
              For further assistance, contact our Data Security Team via the
              Help Center.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
