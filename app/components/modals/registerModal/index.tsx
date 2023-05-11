'use client';

import styles from './style.module.scss';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useState, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRegisterModal } from '@/app/shared/model/hooks/useModal';
import { useLoginModal } from '@/app/shared/model/hooks/useModal';
import Modal from '../modal';
import Heading from '@/app/shared/ui/heading';
import Input from '@/app/shared/ui/input';
import Button from '@/app/shared/ui/button';

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Success!');
        loginModal.onOpen();
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className={styles['register-modal-body']}>
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
      <Input
        id='email'
        label='Email'
        errors={errors}
        register={register}
        disabled={isLoading}
        required
      />
      <Input
        id='name'
        label='Name'
        errors={errors}
        register={register}
        disabled={isLoading}
        required
      />
      <Input
        id='password'
        label='Password'
        errors={errors}
        register={register}
        type='password'
        disabled={isLoading}
        required
      />
    </div>
  );

  const footerContent = (
    <div className={styles['register-modal-footer']}>
      <hr />
      <Button
        label='Continue with Google'
        onClick={() => {
          signIn('google');
        }}
        icon={FcGoogle}
        outline
      />
      <Button
        label='Continue with Github'
        onClick={() => {
          signIn('github');
        }}
        icon={AiFillGithub}
        outline
      />
      <div className={styles['register-modal-footer__action']}>
        <div>Already have an account</div>
        <div
          onClick={toggle}
          className={styles['register-modal-footer__login']}
        >
          Log in
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={registerModal.isOpen}
      disabled={isLoading}
      title='Register'
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
