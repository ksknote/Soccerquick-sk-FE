import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../styles/alertModal.css';

function alertModal(text: string, type: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    width: '400px',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  if (type === 'text') {
    return new Promise<boolean>((resolve) => {
      Swal.fire(text).then((res) => {
        resolve(true);
      });
    });
  }
  if (type === 'success' || type === 'error' || type === 'warning') {
    return Toast.fire({
      icon: type,
      text: text,
    });
  }
  if (type === 'submit') {
    return new Promise<boolean>((resolve) => {
      Swal.fire({
        text: text,
        showCancelButton: true,
        cancelButtonColor: 'var(--color--green)',
        cancelButtonText: '취소',
        confirmButtonColor: 'var(--color--green)',
        confirmButtonText: '확인',
      }).then((res) => {
        if (res.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}

export default alertModal;
