'use client';

import styles from './style.module.scss';

import { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ModalProps } from '@/app/interfaces/modals/modal';
import Button from '@/app/shared/ui/button';

const Modal: FC<ModalProps> = ({
  actionLabel,
  onClose,
  onSubmit,
  isOpen,
  disabled,
  title,
  secondaryActionLabel,
  body,
  footer,
  secondaryAction,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles['modal-wrapper']}>
          <div className={`${styles['modal']} ${showModal && styles.isOpen}`}>
            <div className={styles['modal__content']}>
              <div className={styles['modal-header']}>
                <button
                  onClick={handleClose}
                  className={styles['modal-header__button']}
                >
                  <AiOutlineClose />
                </button>
                <div className={styles['modal-header__title']}>{title}</div>
              </div>
              <div className={styles['modal-body']}>{body}</div>
              <div className={styles['modal-footer']}>
                <div className={styles['modal-footer__buttons']}>
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}

                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
