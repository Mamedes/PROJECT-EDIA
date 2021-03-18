import React,  {useCallback, useRef} from 'react';
import * as Yup from 'yup';
import { Image,KeyboardAvoidingView,ScrollView, Platform, TextInput, Alert } from 'react-native';
import getValidationErrors from '../../utils/getValidationErrors';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {Form} from "@unform/mobile";
import {FormHandles} from "@unform/core"
import { Feather } from '@expo/vector-icons';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/images/logo.png';

import { Container,
   Title, 
   BackToSignIn,
   BackToSignInText } 
   from './styles';
   
   interface SignUpFormData {
    name: string;
    email: string;
    password: string;
  }
const SignUP: React.FC = () => {
  const {goBack} = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const {navigate} = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);


  const handleSignUp = useCallback(
    /*                  
    */
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'no mínimo 6 digitos'),
        });
        // valida o schema do Yup
        await schema.validate(data, {
          abortEarly: false,
        });
        // Conneca com a API
        await api.post('/users', data);
        Alert.alert(
          'Cadastro realizado com sucesso!. ',
          'Você já pode fazer login na aplicação',
        );
        goBack();
      } catch (err) {
        // ! Verificar se o erro é uma instancia de Yup Validation Error
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          // ? significa que num primeiro momento o formRef é nulo
          formRef.current?.setErrors(errors);

          Alert.alert(
            'Erro no cadastro',
            'Ocorreu um erro ao fazer o cadastro, tente novamente.',
          );
        }
      }
    },
    [goBack],
  );
  
  return (
    <>
    <KeyboardAvoidingView 
      style={{flex:1}}
      behavior={Platform.OS==='ios'? 'padding':undefined}>
        <ScrollView keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex:1}}>
        <Container>
          <Image source={logoImg} />

          <Title>Crie sua conta</Title>

          <Form  ref={formRef} onSubmit={handleSignUp}>

          <Input 
            autoCapitalize="words"
            name="name" 
            icon="user" 
            placeholder="Nome"
            onSubmitEditing={()=>{
              emailInputRef.current?.focus();

            }}
            />
          <Input 
            ref={emailInputRef}
            keyboardType="email-address" 
            autoCapitalize="none"
            autoCorrect={false}
            name="email"
            icon="mail" 
            placeholder="E-mail"
            onSubmitEditing={()=>{
              passwordInputRef.current?.focus();

            }}
            />
          <Input 
           ref={passwordInputRef}
           secureTextEntry
           autoCapitalize="none"
           autoCorrect={false}
           textContentType="newPassword"
           name="password"
           icon="lock" 
           placeholder="Senha"
           returnKeyType="send"
           onSubmitEditing={()=>{
            formRef.current?.submitForm()
          }}
           />  
          </Form>      
          <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
              </Button>
         
        </Container>
        
      </ScrollView>
    </KeyboardAvoidingView>
    <BackToSignIn onPress={()=>{goBack()}}>
      <Feather name='arrow-left' size={20} color="#fff"/>
      <BackToSignInText>Voltar para Login</BackToSignInText>
    </BackToSignIn>

    </>
  );
};

export default SignUP;