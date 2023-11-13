import React from "react";
import "../App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface IPaymentForm {
  to: string;
  from: string;
  amount: number;
  description: string;
  status?: string;
}

function Payment(): React.ReactElement {
  // Hooks
  const navigate = useNavigate();

  // States
  const [error, setError] = React.useState<string[]>([]);

  // Functions
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IPaymentForm>();
  const onSubmit: SubmitHandler<IPaymentForm> = async (data) => {
    setError([]);

    apiCall(data);
  };

  const submitError = async (error: string) => {
    setError([]);

    const values = getValues();

    const payload = {
      ...values,
      status: error,
    };

    console.log(payload);

    apiCall(payload);
  };

  const apiCall = async (data: IPaymentForm) => {
    try {
      const response = await axios.post("http://localhost:3000/payment", data);
      console.log(response);
      reset();
    } catch (err: AxiosError) {
      console.log(err);

      if (err?.response?.data.statusCode === 400) {
        setError(err.response.data.message);
      }
      if (err?.response?.data.statusCode === 401) {
        navigate("/login");
      }
      if (err?.response?.data.statusCode === 500) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        {error.length > 0 && (
          <ul className="alert-container">
            {error.map((err) => (
              <li className="alert-text">{err}</li>
            ))}
          </ul>
        )}
        <div className="form-group">
          <label htmlFor="to">To</label>
          <input
            autoFocus
            type="text"
            className="form-control"
            id="to"
            {...register("to", { required: true })}
          />
          {errors.to && <span>To is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            type="text"
            className="form-control"
            id="from"
            {...register("from", { required: true })}
          />
          {errors.from && <span>From is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            {...register("amount", { required: true, valueAsNumber: true })}
          />
          {errors.amount && <span>Amount is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && <span>Description is required</span>}
        </div>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
        <button onClick={() => submitError("401")} className="btn btn-primary">
          401
        </button>
        <button onClick={() => submitError("500")} className="btn btn-primary">
          500
        </button>
      </div>
    </form>
  );
}

export default Payment;
