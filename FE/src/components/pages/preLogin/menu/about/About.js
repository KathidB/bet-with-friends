import AboutRaccoons from './images/aboutraccoons.webp'
import './about.css'
import { useTranslation } from 'react-i18next'

function About () {
  const { t } = useTranslation()
  return (
    <section className='app-wrap about-us'>
      <h2 className='section-title'>
        {t('aboutus.headerA')}{' '}
        <span className='span-brand'> {t('aboutus.headerB')}</span>{' '}
      </h2>

      <img
        className='about-img'
        src={AboutRaccoons}
        width={250}
        alt='Raccoon reading about us page'
      />

      <p>
        <span className='span-brand about-bold'>{t('aboutus.info1a')} </span>{' '}
        {t('aboutus.info1b')}{' '}
      </p>
      <p>
        <span className='span-brand about-bold'> {t('aboutus.info2a')} </span>{' '}
        {t('aboutus.info2b')}{' '}
      </p>
      <p>
        <span className='span-brand about-bold'> {t('aboutus.info3a')} </span>
        {t('aboutus.info3b')}{' '}
      </p>
      <p>
        <span className='span-brand about-bold'>{t('aboutus.info4a')} </span>
        {t('aboutus.info4b')}{' '}
      </p>
      <p>
        <span className='span-brand about-bold'> {t('aboutus.info5a')} </span>
        {t('aboutus.info5b')}{' '}
      </p>
    </section>
  )
}

export default About
