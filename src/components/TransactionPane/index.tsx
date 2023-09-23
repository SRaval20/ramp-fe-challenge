import { useCallback, useState } from "react"
import { fakeFetch } from "../../utils/fetch"
import { SuccessResponse } from "../../utils/types"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"
import { useContext } from "react"
import { AppContext } from "../../utils/context"
import { useCustomFetch } from "../../hooks/useCustomFetch"

export const TransactionPane: TransactionPaneComponent = ({ transaction }) => {
  const [approved, setApproved] = useState(transaction.approved)
  const { clearCache } = useCustomFetch()
  const setTransactionApproval = (newValue: boolean) => {
    fakeFetch<SuccessResponse>("setTransactionApproval", {
      transactionId: transaction.id,
      value: newValue,
    })
    clearCache()
    setApproved(newValue)
  }

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox id={transaction.id} checked={approved} onChange={setTransactionApproval} />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
