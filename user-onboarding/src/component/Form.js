import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const UserForm = ({errors, touched, status}) => {


const [users, setUsers] =useState ([])


useEffect(() => {
    if(status) {
        setUsers([...users, status])
    }
}, [status])


    return (
        <Form>
            {touched.name && errors.name &&<p className="error">{errors.name}</p>}
            <Field type="text" name="name" placeholder="e.g. Jane Doe"/>

            {touched.email && errors.email &&<p className="error">{errors.email}</p>}
            <Field type="email" name="email" placeholder="e.g. janedoe@gmail.com" />

            {touched.password && errors.password &&<p className="error">{errors.password}</p>}
            <Field type="password" name="password" placeholder="********" />

            
            <label>
                <span>Agree to the Terms of Service:</span>
                <Field type="checkbox" name="tos"/>
            </label>

            <button type="submit">Submit</button>
            
            {/* {users.map((user) => (
                <div>Name: {user.name}</div>
            ))} */}
            {users.map((user, index) => {
                return <div key={index}>Name: {user.name}</div>
            })}

        </Form>
    )


}


//Exporting using a higher order function withFormik
export default withFormik({
    mapPropsToValues: (values) => {
        return{
            name: values.name || 'e.g. Jane Doe',
            email: values.email || 'e.g. janedoe@gmail.com',
            password: values.password || 'e.g. the$tr0nge$TP@$SW0RdEvEr',
            tos : values.checkbox || false,
        }
    },
    
    validationSchema: yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required'),
        tos: yup.boolean().oneOf([true], 'Terms of Service Must Be Agreed To')
    }),

    handleSubmit: (values, {setStatus}) => {
        axios.post('https://reqres.in/api/users', values)
            .then((res) =>{
                console.log(res)
                setStatus(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
})(UserForm)

