import createAccount from './images/raccoon-account.webp'
import createAccountSmall from './images/raccoon-account-small.webp'
import getPoints from './images/raccoon-points.webp'
import getPointsSmall from './images/raccoon-points-small.webp'
import beLeader from './images/raccoon-leader.webp'
import beLeaderSmall from './images/raccoon-leader-small.webp'
import arrowOne from './images/arrow1.webp'
import arrowTwo from './images/arrow2.webp'
import './hit.css'
import { useTranslation } from 'react-i18next'

function Hit () {
  const { t } = useTranslation()

  return (
    <section className='app-wrap'>
      <hr />
      <h2 className='section-title'>
        <span className='span-brand'> {t('hit.title-top')}</span>{' '}
        {t('hit.title-bot')}
      </h2>

      <div className='hit-box'>
        <div className='hit-item'>
          <div className='hit-text'>
            <div>
              <h3 className='span-brand'>
                <span className='hit-span-number'> 1 </span> {t('hit.1')}
              </h3>
            </div>
            <p>{t('hit.1-info')}</p>
          </div>

          <img
            srcSet={`
    ${createAccountSmall} 350w,  
    ${createAccount} 500w
  `}
            sizes='
            (max-width: 576px) 200px,
    (max-width: 767px) 290px,
    (min-width: 768px) and (max-width: 991.98px) 290px,
    500px
  '
            src={createAccount}
            alt='Description'
          />
        </div>

        <img className='arrow-one' src={arrowOne} alt='' />

        <div className='hit-item'>
          <img
            className='hit-image-mid'
            srcSet={`
    ${getPointsSmall} 350w,  
    ${getPoints} 500w
  `}
            sizes='
            (max-width: 576px) 200px,
    (max-width: 767px) 290px,
    (min-width: 768px) and (max-width: 991.98px) 290px,
    500px
  '
            src={createAccount}
            alt='Description'
          />
          <div className='hit-text'>
            <div>
              <h3 className='span-brand'>
                <span className='hit-span-number'> 2 </span> {t('hit.2')}
              </h3>
            </div>
            <p>{t('hit.2-info')}</p>
          </div>

          <img
            className='hit-image-mid-bot'
            srcSet={`
    ${getPointsSmall} 350w,  
    ${getPoints} 500w
  `}
            sizes='
            (max-width: 576px) 200px,
    (max-width: 767px) 290px,
    (min-width: 768px) and (max-width: 991.98px) 290px,
    500px
  '
            src={createAccount}
            alt='Description'
          />
        </div>

        <img className='arrow-two' src={arrowTwo} alt='' />

        <div className='hit-item'>
          <div className='hit-text'>
            <div>
              <h3 className='span-brand'>
                <span className='hit-span-number'>3</span> {t('hit.3')}
              </h3>
            </div>
            <p>{t('hit.3-info')}</p>
          </div>

          <img
            srcSet={`
    ${beLeaderSmall} 350w,  
    ${beLeader} 500w
  `}
            sizes='
            (max-width: 576px) 200px,
    (max-width: 767px) 290px,
    (min-width: 768px) and (max-width: 991.98px) 290px,
    500px
  '
            src={createAccount}
            alt='Description'
          />
        </div>
      </div>
    </section>
  )
}

export default Hit
