// Write your code here
import {BsFillStarFill, BsExclamationCircleFill} from 'react-icons/bs'
import {BiGitMerge} from 'react-icons/bi'
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {avatarUrl, forksCount, issuesCount, name, id} = details
  return (
    <div className="card-1">
      <div className="card__cover text-center">
        <img className="card-image" src={avatarUrl} alt="hh" />
        <h1 className="card-heading">{name}</h1>
      </div>
      <div className="card__content">
        <div className="d-flex">
          <BsFillStarFill className="text-warning icon" />
          <p>{forksCount} stars</p>
        </div>
        <div className="d-flex ">
          <BiGitMerge className="text-primary icon" />
          <p>{forksCount} forks</p>
        </div>
        <div className="d-flex">
          <BsExclamationCircleFill className="text-danger icon" />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </div>
  )
}

export default RepositoryItem
