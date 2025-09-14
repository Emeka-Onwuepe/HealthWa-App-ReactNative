import { addAlert } from "@/integrations/features/alert/alertSlice";
import { useHandlePasswordMutation } from "@/integrations/features/apis/apiSlice";
import { logoutUser } from "@/integrations/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../../components/ui/Button";
import PageHeader from "../../../../components/ui/PageHeader";
import styles from "./styles";



interface ChangePasswordFormData {
  old_password: string,
  new_password: string,
  confirm_password: string,
}


export default function ChangePassword() {
  const navigation = useRouter();
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [handlePassword, {isLoading}] = useHandlePasswordMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });


  const onSubmit = async (data: ChangePasswordFormData) => {

    const data_ = {
      usertoken : user.usertoken,
      action : 'reset_password',
      new_password : data.new_password,
      old_password : data.old_password,
    }

    const res = await handlePassword(data_)

    if(res.data){
      console.log(res)
      let success = {status:200,  message: 'Password reset successfully'}
      dispatch(addAlert({...success, page: "changePasswordPage"}))
      logoutUser()
      navigation.replace('/login')

    }else if (res.error) {
    dispatch(addAlert({ ...res.error, page: "changePasswordPage" }));
       }
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PageHeader title="Change Password" />
        <View style={styles.header}>
          <Text style={styles.title}>Create new password</Text>
          <Text style={styles.subTitle}>
            Your new password must be different from previously used passwords.
          </Text>
        </View>

        <View>
          <View>
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Old password</Text>
                  <TextInput
                    placeholder="Enter your current password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="default"
                    style={styles.input}
                    secureTextEntry
                  />
                  {errors.old_password && (
                    <Text style={styles.errorText}>
                      {errors.old_password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
          <View>
            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>New password</Text>
                  <TextInput
                    placeholder="Enter your new password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="default"
                    style={styles.input}
                    secureTextEntry
                  />
                  {errors.new_password && (
                    <Text style={styles.errorText}>
                      {errors.new_password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
          <View>
            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange, value, onBlur } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Confirm password</Text>
                  <TextInput
                    placeholder="Confirm your new password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="default"
                    style={styles.input}
                    secureTextEntry
                  />
                  {errors.confirm_password && (
                    <Text style={styles.errorText}>
                      {errors.confirm_password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
          <Button onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


