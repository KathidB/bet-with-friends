import PatoPoker from './images/patopoker.webp'

import './ads.css'

function Ads () {
  return (
    <div className='panel-side-box'>
      <h2 className='panel-header'>
        Twoja <span className='span-brand'>Reklama</span>{' '}
      </h2>

      <div className='ad-box'>
        <img className='patopoker' src={PatoPoker} alt='' width={220} />
      </div>
    </div>
  )
}

export default Ads
