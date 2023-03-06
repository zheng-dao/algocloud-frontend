import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/changeLog/form/changeLogFormActions';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
// import userEnumerators from 'src/modules/changeLog/changeLogEnumerators';
import { yupResolver } from '@hookform/resolvers/yup';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import moment from 'moment';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';

const schema = yup.object().shape({
  description: yupFormSchemas.string(i18n(
    'changeLog.fields.description'),
    {
      required: true,
    }),
  date: yupFormSchemas.date(
    i18n('changeLog.fields.date'),
    { required: true },
  ),
});

function ChangeLogEditForm(props) {
  const dispatch = useDispatch();

  const [initialValues] = useState(() => ({
    description: props.changeLog.description,
    date: props.changeLog.date ? moment(props.changeLog.date, 'YYYY-MM-DD').toDate() : null,
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const data = {
      ...values,
    };
    const id = props.changeLog.id;
    dispatch(actions.doUpdate(id, data));
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-7 col-md-8 col-12">
              <DatePickerFormItem
                name="date"
                label={i18n('changeLog.fields.date')}
                required={true}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <TextAreaFormItem
                name="description"
                label={i18n('changeLog.fields.description')}
                required={true}
                autoFocus
              />
            </div>
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={props.saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={props.saveLoading}
                iconClass="far fa-save"
              />{' '}
              {i18n('common.save')}
            </button>

            <button
              className="btn btn-light"
              disabled={props.saveLoading}
              onClick={onReset}
              type="button"
            >
              <i className="fas fa-undo"></i>{' '}
              {i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                className="btn btn-light"
                disabled={props.saveLoading}
                onClick={() => props.onCancel()}
                type="button"
              >
                <i className="fas fa-times"></i>{' '}
                {i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default ChangeLogEditForm;
