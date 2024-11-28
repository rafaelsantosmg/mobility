import { Autocomplete } from '@react-google-maps/api';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useAppContext } from '../hooks/useAppContext';
import useRide from '../hooks/useRide';
import LoaderSpinner from './LoaderSpinner';

interface FormValues {
  origin: string;
  destination: string;
  customerId: string;
}

const DrivingForm: React.FC = () => {
  const { onEstimateRide, loading } = useRide();

  const autocompleteRefs = useRef<{
    origin: google.maps.places.Autocomplete | null;
    destination: google.maps.places.Autocomplete | null;
    customerId: string | null;
  }>({ origin: null, destination: null, customerId: null });

  const validationSchema = Yup.object({
    origin: Yup.string().required('Endereço de origem é obrigatório'),
    destination: Yup.string().required('Endereço de destino é obrigatório'),
    customerId: Yup.string()
      .matches(/^\d+$/, 'ID do cliente deve conter apenas números')
      .required('ID do usuário é obrigatório'),
  });

  const handlePlaceChange = (
    fieldName: keyof FormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const autocompleteRef = autocompleteRefs.current[fieldName];
    if (
      autocompleteRef &&
      autocompleteRef instanceof google.maps.places.Autocomplete
    ) {
      const place = autocompleteRef.getPlace();
      const address = place?.formatted_address || '';
      setFieldValue(fieldName, address);
    }
  };
  const { setCustomerId } = useAppContext();

  const initialValues: FormValues = {
    origin: '',
    destination: '',
    customerId: '',
  };

  return loading ? (
    <LoaderSpinner />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(
        values: FormValues,
        { resetForm }: FormikHelpers<FormValues>
      ) => {
        onEstimateRide(values);
        setCustomerId(values.customerId);
        resetForm();
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form className="flex flex-col gap-4">
          <div className="lg:w-4/5 xl:w-3/5">
            <label htmlFor="customerId" className="mb-2 block">
              Id do Usuário
            </label>

            <Field
              id="customerId"
              name="customerId"
              placeholder="Digite um id de usuário ex: 1"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-200 dark:text-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />

            {errors.customerId && touched.customerId && (
              <div className="mt-1 text-sm text-red-500">
                {errors.customerId}
              </div>
            )}
          </div>

          <div className="lg:w-4/5 xl:w-3/5">
            <label htmlFor="origin" className="mb-2 block">
              Endereço de origem
            </label>
            <Autocomplete
              onLoad={(ref) => (autocompleteRefs.current.origin = ref)}
              onPlaceChanged={() => handlePlaceChange('origin', setFieldValue)}
            >
              <Field
                id="origin"
                name="origin"
                placeholder="Digite o endereço de origem"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-200 dark:text-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </Autocomplete>
            {errors.origin && touched.origin && (
              <div className="mt-1 text-sm text-red-500">{errors.origin}</div>
            )}
          </div>

          <div className="lg:w-4/5 xl:w-3/5">
            <label htmlFor="destination" className="mb-2 block">
              Endereço de destino
            </label>
            <Autocomplete
              onLoad={(ref) => (autocompleteRefs.current.destination = ref)}
              onPlaceChanged={() =>
                handlePlaceChange('destination', setFieldValue)
              }
            >
              <Field
                id="destination"
                name="destination"
                placeholder="Digite o endereço de destino"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-200 dark:text-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </Autocomplete>
            {errors.destination && touched.destination && (
              <div className="mt-1 text-sm text-red-500">
                {errors.destination}
              </div>
            )}
          </div>

          <div className="mt-10 flex justify-end lg:w-4/5 xl:w-3/5">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-400"
            >
              Calcular
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DrivingForm;
