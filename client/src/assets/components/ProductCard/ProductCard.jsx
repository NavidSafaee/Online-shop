import './ProductCard.scss'
import { LuStar } from 'react-icons/lu'
import { MdStar } from "react-icons/md"
import { FiEye } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCartPlus } from 'react-icons/bs'
import baseURL from '../../baseURL'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function ProductCard({ _id, title, imageUrl, rate, category, status, discount, price, newPrice }) {
  let coloredStars = Array.from(Array(rate).keys())
  let greyStars = Array.from(Array(5 - rate).keys())

  return (
    <Link to={`/products/${_id}`} className="product-card">
      {
        (status === "New") && <span className='status new-product'>New</span>
      }
      {
        (status === "Sale") && <span className='status sale'>Sale</span>
      }
      <div className="img-wrapper">
        <img src={`${baseURL}/public/${imageUrl}`} alt={title} crossOrigin='false'/>
        <div className="icon-wrapper"><AiOutlineHeart className='action-icon heart-icon' /></div>
        <div className="icon-wrapper"><FiEye className='action-icon eye-icon' /></div>
        <div className="icon-wrapper"><BsCartPlus className='action-icon cart-icon' /></div>
      </div>
      <div className="detail-box">
        <span className="categoryName">
          {category}
        </span>
        <b className="product-name">{title}</b>
      </div>
      <div className="end-row">
        <div className="price-part">
          <span className='current-price'>${(newPrice !== undefined) ? newPrice : price}</span>
          {discount !== undefined && <span className="old-price">${price}</span>}
        </div>
        {rate !== null && <div className="rate-box">
          {
            coloredStars.map((star, i) => (
              <MdStar key={i} className='colored-star' />
            ))
          }
          {
            greyStars.map((star, i) => (
              <LuStar key={i} className='grey-star' />
            ))
          }
        </div>}
      </div>
    </Link>
  )
}

export default ProductCard