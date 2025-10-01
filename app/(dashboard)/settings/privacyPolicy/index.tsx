import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "../../../../components/ui/PageHeader";
import styles from "./styles";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <PageHeader title="Privacy Policy" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.mainTitle}>
            Your Commitment to Patient Confidentiality and Security in HealthWa
          </Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>1. Protecting Patient Data</Text>
            <Text style={styles.sectionText}>
              All patient information accessed through HealthWa is encrypted and
              stored securely in compliance with HIPAA and other applicable
              privacy regulations. Doctors are required to maintain strict
              confidentiality and must not share patient data outside of
              authorized channels.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              2. Access to Patient Records
            </Text>
            <Text style={styles.sectionText}>
              Doctors can access patient health records, test results, and
              appointment details only for the purpose of providing care.
            </Text>
            <Text style={styles.sectionText}>
              Unauthorized access or misuse of patient information is prohibited
              and may result in account suspension or legal action.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>3. Communication Guidelines</Text>
            <Text style={styles.sectionText}>
              Messages and notifications sent through the app are secure and
              intended solely for professional communication.
            </Text>
            <Text style={styles.sectionText}>
              Avoid discussing sensitive patient information outside the app to
              ensure privacy and compliance.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>4. Managing Appointments</Text>
            <Text style={styles.sectionText}>
              Appointment schedules and updates are shared directly with
              patients through the app. Ensure accuracy when updating or
              canceling appointments to avoid confusion.
            </Text>
            <Text style={styles.sectionText}>
              Patients&apos; consent is required before sharing any
              health-related updates or documents.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>5. Reporting and Compliance</Text>
            <Text style={styles.sectionText}>
              Doctors are encouraged to report any suspected breaches of privacy
              or security issues immediately to the HealthWa support team.
            </Text>
            <Text style={styles.sectionText}>
              Regular audits and training sessions are available to ensure
              adherence to privacy standards.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>6. Your Responsibility</Text>
            <Text style={styles.sectionText}>
              As a healthcare provider, you play a vital user_role in
              safeguarding patient privacy. Always log out of shared devices,
              use strong passwords, and keep your device secure.
            </Text>
            <Text style={styles.sectionText}>
              By using HealthWa, you agree to uphold these privacy standards and
              prioritize the confidentiality of your patients. Together, we can
              build a secure and trusted healthcare environment.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              For questions or concerns about privacy, contact our support team
              at privacy@healthwa.com
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
