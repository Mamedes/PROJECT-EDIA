import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/images/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const passwordInputRef = useRef<TextInput>(null);
  // ? formRef tem uma uma função chamada setFieldvalue

  const { signIn, user } = useAuth();
   console.log(user)

  const handleSignIn = useCallback(
    // Com o useCallback toda váriavel externa ou função
    // Adicione lá no final [] para o useCallback monitorar.
    // data: SignInFormData => é o tipo de dado que o data vai receber.
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'Senha Obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const { email, password } = data;
        console.log(data);
        await signIn({
          email,
          password,
        });
      } catch (err) {
        // ! Verificar se o erro é uma instancia de Yup Validation Error
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          // ? significa que num primeiro momento o formRef é nulo
          formRef.current?.setErrors(errors);
          console.log(errors);
          return;
        }
        // ? caso não seja retornar uma mensagem mais generica.
        Alert.alert(
          'Erro na Autenticação',
          'Ocorreu um erro ao fazer login, cheque as credênciais',
        );
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        // ? Muito bom isso é para tratar o teclado e ajustar caso seja IOS
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title> Faça seu Logon </Title>
            </View>
            <Form onSubmit={handleSignIn} ref={formRef}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
                secureTextEntry
              />
               </Form>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
           
            <ForgotPassword
              onPress={() => {
                console.log();
              }}
            >
              <ForgotPasswordText>Esqueci minha Senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigate('SignUp')}>
        <Feather name="log-in" size={20} color="#c2dfe3" />
        <CreateAccountButtonText>Criar uma Conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;