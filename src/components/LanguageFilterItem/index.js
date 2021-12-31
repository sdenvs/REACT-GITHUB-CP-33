// Write your code here

const LanguageFilterItem = props => {
  const {details, activeTab, changeTab} = props
  const {id, language} = details
  const changeTabFun = () => {
    changeTab(id)
  }
  return (
    <li>
      <button
        type="button"
        onClick={changeTabFun}
        className={`btn-style bg-transparent btn ${
          id === activeTab ? 'btn-outline-primary' : 'border-0'
        }`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
