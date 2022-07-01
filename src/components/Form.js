import React from "react";
import Lists from "./Lists";
import { useForm } from "react-hook-form";
import { default as api } from "../store/ApiSlice";

const Form = () => {
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    if (!data) return {};
    await addTransaction(data).unwrap();
    resetField("name");
    resetField("amount");
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
 
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name")}
              id=""
              placeholder="Salary,House Rent, SIP"
              className="form-input"
            />
          </div>
          <select {...register("type")} className="form-input">
            <option value="Investment" defaultValue>
              Investment
            </option>
            <option value="Expense" defaultValue>
              Expense
            </option>
            <option value="Savings" defaultValue>
              Savings
            </option>
          </select>
          <div className="input-group">
            <input
              type="text"
              {...register("amount")}
              id=""
              placeholder="Amount"
              className="form-input"
            />
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-indigo-500 w-full">
              Make Tranaction
            </button>
          </div>
        </div>
      </form>

      <Lists></Lists>
    </div>
  );
};

export default Form;
