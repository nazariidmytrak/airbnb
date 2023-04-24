'use client';

import styles from './style.module.scss';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from '../modal';
import Heading from '../modal/heading';
import Input from '../../inputs/input';
import Button from '../../button';

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const router = useRouter();

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className={styles['login-modal-body']}>
      <Heading title='Welcome back' subtitle='Login to your account' />
      <Input
        id='email'
        label='Email'
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
    <div className={styles['login-modal-footer']}>
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
      <div className={styles['login-modal-footer__action']}>
        <div>Don't have an account?</div>
        <div onClick={toggle} className={styles['login-modal-footer__login']}>
          Sign up
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={loginModal.isOpen}
      disabled={isLoading}
      title='Login'
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
