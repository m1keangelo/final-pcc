
// Update both feedback box sections
{inputValue && (
  <div className="mt-4 feedback-box">
    <p className="font-medium">{getFeedbackMessage()}</p>
  </div>
)}

{incomeType && (
  <div className="mt-4 feedback-box">
    <p className="font-medium">{getIncomeTypeFeedbackMessage()}</p>
  </div>
)}
