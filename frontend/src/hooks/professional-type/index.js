import { useCallback, useState } from "react";

import { getAll, create } from "../../api/professional-type";

const useProfessionalType = () => {
  const [professionalTypes, setProfessionalTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const listProfessionalTypes = useCallback(() => {
    const list = async () => {
      setLoading(true);
      return getAll()
        .then(({ data: { data: professionalTypes } }) => {
          setProfessionalTypes(professionalTypes);
          setLoading(false);
        })
        .catch((error) => setError(error));
    };

    list();
  }, []);

  const newProfessionalType = useCallback((data) => {
    const generate = async () => {
      setLoading(true);
      return create(data)
        .then(({ data: { data: professionalType } }) => {
          setProfessionalTypes((professionalTypes) => [
            professionalType,
            ...professionalTypes,
          ]);
          setLoading(false);
        })
        .catch((error) => setError(error));
    };

    generate();
  }, []);

  return {
    professionalTypes,
    error,
    loading,

    listProfessionalTypes,
    newProfessionalType,
  };
};

export { useProfessionalType };
