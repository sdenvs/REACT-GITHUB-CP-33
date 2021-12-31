import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeTab: languageFiltersData[0].id,
    isLoading: true,
    responseOk: false,
    reposList: [],
  }

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    const {activeTab} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTab}`

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const modifData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        id: eachItem.id,
      }))
      this.setState({
        reposList: modifData,
        isLoading: false,
        responseOk: response.ok,
      })
    } else {
      this.setState({isLoading: false, responseOk: response.ok})
    }
  }

  renderSucces = () => {
    const {reposList} = this.state
    return (
      <ul className="repocards">
        {reposList.map(eachItem => (
          <RepositoryItem details={eachItem} key={eachItem.key} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderResult = () => {
    const {responseOk} = this.state
    switch (responseOk) {
      case true:
        return this.renderSucces()

      case false:
        return this.renderFailure()

      default:
        return null
    }
  }

  changeTab = id => {
    this.setState({activeTab: id, isLoading: true}, this.fetchDetails)
  }

  render() {
    const {activeTab, isLoading} = this.state
    return (
      <div className="p-2 d-flex flex-column align-items-center">
        <h1 className="heading">Popular</h1>
        <ul className="tabUlList">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              changeTab={this.changeTab}
              activeTab={activeTab}
              details={eachItem}
              key={eachItem.id}
            />
          ))}
        </ul>
        {isLoading ? this.renderLoading() : this.renderResult()}
      </div>
    )
  }
}

export default GithubPopularRepos
