'use client';

import styles from './style.module.scss';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from '../modal';
import Heading from '../modal/heading';
import Input from '../../inputs/input';
import Button from '../../button';

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useRegisterModal();

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
        onClose();
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
        onClick={() => {}}
        icon={FcGoogle}
        outline
      />
      <Button
        label='Continue with Github'
        onClick={() => {}}
        icon={AiFillGithub}
        outline
      />
      <div className={styles['register-modal-footer__action']}>
        <div>Already have an account</div>
        <div
          onClick={onClose}
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
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={isOpen}
      disabled={isLoading}
      title='Register'
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
