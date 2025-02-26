import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

const registerUser = async (name, email, password, phone) => {
    try {
        const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredentials;

        await user.updateProfile({ displayName: name});

        await Firestore().collection('users').doc(user.uid).set({
            name,
            email,
            phone,
            createdAt: new Date(),
        });

        return { success: true, user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export default registerUser