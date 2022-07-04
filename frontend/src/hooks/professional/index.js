import { useCallback, useState } from "react";

import { getAll, create } from "../../api/professional";

const useProfessional = () => {
  const [professionals, setProfessionals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const listProfessionals = useCallback(() => {
    const list = async () => {
      setLoading(true);
      return getAll()
        .then(({ data: { data: professionals } }) => {
          setProfessionals(professionals);
          setLoading(false);
        })
        .catch((error) => setError(error));
    };

    list();
  }, []);

  const newProfessional = useCallback((data) => {
    const generate = async () => {
      setLoading(true);
      await create(data)
        .then(({ data: { data: professional } }) => {
          setProfessionals((professionals) => [professional, ...professionals]);
          setLoading(false);
        })
        .catch((error) => setError(error));
    };

    generate();
  }, []);

  return {
    professionals,
    error,
    loading,

    listProfessionals,
    newProfessional,
  };
};

export { useProfessional };
