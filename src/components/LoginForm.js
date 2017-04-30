import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress(){
    const { email, password } = this.state;

    this.setState({ error: '', loading: true});
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
      });
  }

  onLoginSuccess(){
    this.setState({ email: '',
                    password: '',
                    error: '',
                    loading: false});

  }

  onLoginFailed(){
    this.setState({
                    error: 'Authentication Failed',
                    loading: false,
    });
  }

  renderButton(){
    if(this.state.loading){
      return <Spinner size="small"/>;
    }

    return(
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render(){
    return(
        <Card>
          <CardSection>
            <Input
              placeholder="example@example.com"
              label="Email"
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
              />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry={true}
              placeholder="password"
              label="Password"
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          </CardSection>

          <Text style={ styles.errorTextStyle }>
            {this.state.error}
          </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
