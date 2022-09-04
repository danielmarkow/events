import {useContext} from "react";
import {UserContext} from "../context/userContext";
import {useNavigate} from "react-router-dom";

import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    loginEmail: yup.string().email().required(),
    loginPw: yup.string().min(8).required(),
});

export default function SignIn() {
    const {signIn} = useContext(UserContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data) {
        console.log(data);
        try {
            const cred = await signIn(
                data.loginEmail,
                data.loginPw
            );
            navigate("/admin");
        } catch {
            alert("email and / or pw incorrect");
        }
    }

    return (
    <>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label
                htmlFor="loginEmail"
            >Email</label>
            <input
                id="loginEmail"
                type="email"
                {...register("loginEmail")}
            />
            <p>{errors.loginEmail?.message}</p>
            <label
                htmlFor="loginPw"
            >Password</label>
            <input
                id="loginPw"
                type="password"
                {...register("loginPw")}
            />
            <p>{errors.loginPw?.message}</p>
            <button type="submit">Submit</button>
        </form>
    </>
    );
}