import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import InputCustom from '../../components/InputCustom/InputCustom';
import SwitchGender from '../../components/SwitchGender/SwitchGender';
import SelectCountry from '../../components/SelectCountry/SelectCountry';
import CheckboxAccept from '../../components/CheckboxAccept/CheckboxAccept';
import userSchema from '../../utils/userSchema';
import getBase64 from '../../utils/getBase64';
import { saveDataUser } from '../../store/slice/formSlice';
import { ICardUserCommonFile } from '../../types/types';
import { INPUT_PROPS } from '../../utils/constants/constants';

const ReactHookFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ICardUserCommonFile>({
    mode: 'onChange',
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data: ICardUserCommonFile) => {
    const imageBase64 = data.image && (await getBase64(data.image[0]));

    const newData = {
      ...data,
      image: imageBase64,
    };

    dispatch(saveDataUser(newData));
    reset();
    navigate('/');
  };

  return (
    <>
      <h1 className="title">React Hook Form Page</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {INPUT_PROPS.map((input, index) => {
          return (
            <InputCustom
              key={index}
              inputProps={input}
              register={register}
              errors={errors}
              watch={watch}
            />
          );
        })}

        <SwitchGender register={register} />

        <SelectCountry register={register} errors={errors} />

        <CheckboxAccept register={register} errors={errors} />

        <input
          type="submit"
          value="Create card"
          className="button"
          disabled={!isValid}
        />
      </form>
    </>
  );
};

export default ReactHookFormPage;
