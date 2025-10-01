import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "../../../../components/ui/PageHeader";
import styles from "./styles";

export default function FAQ() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <PageHeader title="FAQ" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.mainTitle}>
            Find Answers to Your Queries, Your Guide to Using HealthWa App
            Effectively
          </Text>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              1. How do I access my patient appointments?
            </Text>
            <Text style={styles.answerText}>
              All scheduled appointments can be viewed in the
              &quot;Appointments&quot; tab on your dashboard. You&apos;ll also
              receive push notifications for upcoming appointments if enabled in
              your settings.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              2. Can I send messages to my patients through the app?
            </Text>
            <Text style={styles.answerText}>
              Yes, you can securely message patients via the &quot;Patient
              Chat&quot; feature. This ensures all communication is
              HIPAA-compliant and stored within the app.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              3. How do I update a patient&apos;s prescription?
            </Text>
            <Text style={styles.answerText}>
              To update or renew prescriptions, navigate to the
              &quot;Prescriptions&quot; section under the patient&apos;s
              profile. Any changes will automatically sync with the
              patient&apos;s app and notify them.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              4. What happens if I miss an appointment notification?
            </Text>
            <Text style={styles.answerText}>
              If you miss a notification, don&apos;t worry! All appointment
              reminders are logged in the &quot;Notifications&quot; tab, and
              you&apos;ll still receive alerts via SMS or email if enabled.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              5. Can I view a patient&apos;s medical history?
            </Text>
            <Text style={styles.answerText}>
              Yes, you may be able to access limited medical records, including
              past diagnoses, medications, and test results, by selecting the
              &quot;Medical History&quot; option in the patient&apos;s profile.
              This is subject to adherence to data sharing rights and consent of
              the data subject.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              6. How do I upload test results for a patient?
            </Text>
            <Text style={styles.answerText}>
              Upload test results by going to the &quot;Documents &
              Reports&quot; section in the patient&apos;s profile. Once
              uploaded, the patient will receive a notification with access to
              the results.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              7. Is there a way to customize notification preferences?
            </Text>
            <Text style={styles.answerText}>
              Absolutely! Visit the &quot;Notification Settings&quot; in your
              account to choose how and when you&apos;d like to receive updates
              about appointments, messages, and more.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              8. Can I manage multiple patients at once?
            </Text>
            <Text style={styles.answerText}>
              Yes, the &quot;Patient List&quot; view allows you to filter and
              manage multiple patients efficiently. You can sort by appointment
              date, condition, or priority level.
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              9. What if I need technical support?
            </Text>
            <Text style={styles.answerText}>
              For any technical issues, tap the &quot;Help Center&quot; button
              in the app or contact our support team directly via email or
              phone. Our team is available 24/7 to assist you.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Still have questions? Reach out to our support team for further
              assistance!
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
