import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = (data: FormData) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email: </label>
        <input 
          type='email'
          {...register('email', { required: 'Email cannot be empty' })}
        />
        {errors.email && <small>{errors.email.message}</small>}
      </div>
      
      <div>
        <label>Password: </label>
        <input 
          type='password'
          {...register('password', { required: 'Enter your password.' })} 
        />
        {errors.password && <small>{errors.password.message}</small>}
      </div>
      
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
};

export default Login;