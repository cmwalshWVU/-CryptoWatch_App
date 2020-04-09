import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonLoading } from '@ionic/react';
import './Login.scss';
// import { signInWithFirebase, loadUserSession, setCurrentUser } from "../data/store/actions/authActions"
import { RouteComponentProps, Redirect } from 'react-router';
import { toast } from '../components/toast';
import { useDispatch } from 'react-redux';
import { loginUser } from '../firebase/firebase';
import { setUserState } from '../store/actions/firebaseActions';


interface OwnProps extends RouteComponentProps {}

const Login: React.FC<OwnProps> = (props, { }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

//   useEffect(() => {
//     // Update the document title using the browser API
//     if (props.auth.isAuthenticated) {
//       props.history.push('/tabs/news', {direction: 'none'});
//     } 
//   }, [props.auth]);

  const login = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    setFormSubmitted(true);
    if(!email) {
      toast("email is required")
      setUsernameError(true);
    }
    if(!password) {
      toast("password is required")
      setPasswordError(true);
    }
    if(email && password) {
      const user = {
        email: email,
        password: password
      };

      const res: any = await loginUser(user)
      if (res) {
        dispatch(setUserState(res.user))
        toast("You have logged in!")
        props.history.push('/news', {direction: 'none'});
      }
      // await props.signInWithFirebase(user);
    }
    setLoading(false)
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <IonLoading message={"Authentication in progress!"} duration={0} isOpen={loading} />
        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Email</IonLabel>
              <IonInput name="email" type="text" value={email} spellCheck={false} autocapitalize="off" onIonChange={e => setEmail(e.detail.value!)}
                required>
              </IonInput>
            </IonItem> 

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default Login