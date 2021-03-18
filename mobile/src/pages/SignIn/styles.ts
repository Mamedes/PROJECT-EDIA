import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper'
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #c2dfe3;
  font-family: 'Poppins_400Regular';
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top:24px;
`;
export const ForgotPasswordText = styled.Text`
  color:#f4ede8;
  font-size:14px;
  font-family: 'Poppins_400Regular';
`;
export const CreateAccountButton = styled.TouchableOpacity`
  position:absolute;
  left:0;
  bottom:0;
  right:0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #322129;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  font-size:14px;
  color: #c2dfe3;
  font-family: 'Poppins_400Regular';
  margin-left:16px;
`;