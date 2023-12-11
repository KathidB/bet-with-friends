import createAccount from './images/raccoon-account.webp'
import createAccountSmall from './images/raccoon-account-small.webp'
import getPoints from './images/raccoon-points.webp'
import getPointsSmall from './images/raccoon-points-small.webp'
import beLeader from './images/raccoon-leader.webp'
import beLeaderSmall from './images/raccoon-leader-small.webp'
import arrowOne from './images/arrow1.webp'
import arrowTwo from './images/arrow2.webp'
import './hit.css'

function Hit () {
  return (
    <section className='app-wrap'>
      <hr />

      <h2 className='section-title'>
        <span className='span-brand'> Jak</span> To Działa?
      </h2>

      <div className='hit-box'>
        <div className='hit-item'>
          <div className='hit-text'>
            <div>
              <h3 className='span-brand'>
                <span className='hit-span-number'> 1 </span> Stwórz Konto
              </h3>
            </div>
            <p>
              Załóż konto, wybierz pseudonim oraz awatar i zgaduj wyniki meczów
              najpopularniejszych lig piłkarskich. Zdobyte punkty będą widoczne
              w tabeli wyników . Sprawdź, jak się radzisz w porównaniu z innymi
              uczestnikami.
            </p>
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

          {/* <img
            className='hit-image'
            src={createAccount}
            loading='lazy'
            width={500}
            height={500}
            alt='Cartoon Raccon Creating an Account'
          /> */}
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
                <span className='hit-span-number'> 2 </span> Zbieraj Punkty
              </h3>
            </div>
            <p>
              Po zakończeniu rozgrywek nasz system automatycznie przydzieli
              odpowiednią ilość punktów do Twojego profilu w zależności od
              trafności Twoich przewidywań.
            </p>
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
                <span className='hit-span-number'>3</span> Tabela wyników
              </h3>
            </div>
            <p>
              Tabela wyników będzie regularnie aktualizowana, prezentując
              punktację innych użytkowników serwisu. Sprawdź, jak dobrze radzisz
              sobie w porównaniu z innymi i zobacz, na której pozycji aktualnie
              się znajdujesz.
            </p>
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
