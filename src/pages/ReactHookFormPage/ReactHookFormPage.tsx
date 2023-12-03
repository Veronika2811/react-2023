import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import userSchema from '../../utils/userSchema';
import InputCustom from '../../components/InputCustom/InputCustom';
import SwitchGender from '../../components/SwitchGender/SwitchGender';
import SelectCountry from '../../components/SelectCountry/SelectCountry';
import CheckboxAccept from '../../components/CheckboxAccept/CheckboxAccept';
import { ICardUser } from '../../types/types';
import { INPUT_PROPS } from '../../utils/constants/constants';

import classes from './ReactHookFormPage.module.scss';
import getBase64 from '../../utils/getBase64';
import { saveDataUser } from '../../store/slice/formSlice';
import { useNavigate } from 'react-router-dom';

const ReactHookFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ICardUser>({
    mode: 'onChange',
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data: ICardUser) => {
    const image1 = data.image && (await getBase64(data.image[0]));
    const newData = {
      ...data,
      image: image1,
    };

    dispatch(saveDataUser(newData));
    reset();
    navigate('/');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.form__title}>Create Card User</h2>

      {INPUT_PROPS.map((el, index) => {
        return (
          <InputCustom
            key={index}
            inputProp={el}
            register={register}
            errors={errors}
          />
        );
      })}

      <SwitchGender register={register} />

      <SelectCountry register={register} errors={errors} />

      <CheckboxAccept register={register} errors={errors} />

      <input
        type="submit"
        value="Create card"
        className={classes.input_submit}
        disabled={!isValid}
      />
    </form>
  );
};

export default ReactHookFormPage;
