'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import {
  useIntersectionObserver,
  useStaggeredIntersectionObserver,
} from '../../hooks/useIntersectionObserver';
import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
import { CTAButton } from '../../components/CTAButtons';
import { HtmlContent } from '../../components/HtmlContent';
import {
  ShieldCheck,
  Zap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Brain,
  AlertTriangle,
  MessageSquare,
  Clock,
  Crown,
  Layers,
  Scale,
  Target,
  Cpu,
  ChevronDown,
  FileX,
} from 'lucide-react';



import { HeroBackgroundEffects } from '../../components/HeroBackgroundEffects';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const problemsSectionRef = useRef<HTMLElement>(null);
  const [isProblemsVisible, setIsProblemsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [cardVisibility, setCardVisibility] = useState([false, false, false, false]);
  const cardRefs = useStaggeredIntersectionObserver(
    4,
    useCallback((index: number) => {
      setCardVisibility((prev) => {
        const newVisibility = [...prev];
        newVisibility[index] = true;
        return newVisibility;
      });
    }, [])
  );

  const [solutionCardVisibility, setSolutionCardVisibility] = useState([
    false,
    false,
    false,
    false,
  ]);
  const solutionCardRefs = useStaggeredIntersectionObserver(
    4,
    useCallback((index: number) => {
      setSolutionCardVisibility((prev) => {
        const newVisibility = [...prev];
        newVisibility[index] = true;
        return newVisibility;
      });
    }, [])
  );
  const [isSolutionHeaderVisible, setIsSolutionHeaderVisible] = useState(false);
  const [isServicesHeaderVisible, setIsServicesHeaderVisible] = useState(false);
  const [isTestimonialsHeaderVisible, setIsTestimonialsHeaderVisible] = useState(false);
  const [isFaqHeaderVisible, setIsFaqHeaderVisible] = useState(false);
  const [isContactHeaderVisible, setIsContactHeaderVisible] = useState(false);

  // Consolidated header observers
  const solutionHeaderRef = useIntersectionObserver(
    useCallback(() => setIsSolutionHeaderVisible(true), [])
  );
  const servicesHeaderRef = useIntersectionObserver(
    useCallback(() => setIsServicesHeaderVisible(true), [])
  );
  const testimonialsHeaderRef = useIntersectionObserver(
    useCallback(() => setIsTestimonialsHeaderVisible(true), [])
  );
  const faqHeaderRef = useIntersectionObserver(useCallback(() => setIsFaqHeaderVisible(true), []));
  const contactHeaderRef = useIntersectionObserver(
    useCallback(() => setIsContactHeaderVisible(true), [])
  );

  // Services cards animation
  const [servicesCardVisibility, setServicesCardVisibility] = useState([false, false, false]);
  const servicesCardRefs = useStaggeredIntersectionObserver(
    3,
    useCallback((index: number) => {
      setServicesCardVisibility((prev) => {
        const newVisibility = [...prev];
        newVisibility[index] = true;
        return newVisibility;
      });
    }, [])
  );

  // Testimonials cards animation
  const [testimonialsCardVisibility, setTestimonialsCardVisibility] = useState([
    false,
    false,
    false,
  ]);
  const testimonialsCardRefs = useStaggeredIntersectionObserver(
    3,
    useCallback((index: number) => {
      setTestimonialsCardVisibility((prev) => {
        const newVisibility = [...prev];
        newVisibility[index] = true;
        return newVisibility;
      });
    }, [])
  );

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    // Fade in hero on first load
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasScrolled) {
            setIsProblemsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (problemsSectionRef.current) {
      observer.observe(problemsSectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (problemsSectionRef.current) {
        observer.unobserve(problemsSectionRef.current);
      }
    };
  }, [hasScrolled]);

  // All card observers now consolidated into hooks above

  const tHero = useTranslations('hero');
  const tProblems = useTranslations('problems');
  const tSolution = useTranslations('solution');
  const tServices = useTranslations('services');
  const tTestimonials = useTranslations('testimonials');
  const tFaq = useTranslations('faq');
  const tContact = useTranslations('contact');

  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="relative"
        style={{
          opacity: heroVisible ? 1 : 0,
          transition: 'opacity 0.2s ease-in',
        }}
      >
        <Hero
          title={tHero('title')}
          subtitle={tHero('subtitle')}
          description={tHero('description')}
          primaryCTA={{
            text: tHero('primaryCTA'),
            href: '/login?method=google',
          }}
          prompt={tHero('prompt')}
          foundersGrant={tHero('foundersGrant')}
          incineratorProtocol={tHero('incineratorProtocol')}
          chips={{
            response: tHero('chips.response'),
            complaint: tHero('chips.complaint'),
            lease: tHero('chips.lease'),
            notification: tHero('chips.notification'),
          }}
        />
        <HeroBackgroundEffects />
      </div>

      {/* Problem Section */}
      <section
        ref={problemsSectionRef}
        className="py-32 bg-background border-b border-border relative overflow-hidden"
      >


        {/* Scroll Indicator Arrow */}
        {!isProblemsVisible && (
          <div
            className="flex justify-center pt-0 pb-0 cursor-pointer relative z-20"
            onMouseEnter={() => {
              setHasScrolled(true);
              setIsProblemsVisible(true);
            }}
            onClick={() => {
              setHasScrolled(true);
              setIsProblemsVisible(true);
            }}
          >
            <svg
              className="w-12 h-12 text-muted-foreground hover:text-primary transition-colors duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${isProblemsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <HtmlContent
              content={tProblems('title')}
              as="h2"
              className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
            />
            <HtmlContent
              content={tProblems('description')}
              as="p"
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              ref={cardRefs[0]}
              className={`text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${cardVisibility[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 font-sans">
                {tProblems('slowTransformation.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                {tProblems('slowTransformation.description')}
              </p>
            </div>

            <div
              ref={cardRefs[1]}
              className={`text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${cardVisibility[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 font-sans">
                {tProblems('poorExperience.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                {tProblems('poorExperience.description')}
              </p>
            </div>

            <div
              ref={cardRefs[2]}
              className={`text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${cardVisibility[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 font-sans">
                {tProblems('opportunityCost.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                {tProblems('opportunityCost.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={solutionHeaderRef}
            className={`text-center mb-20 transition-all duration-1000 ${isSolutionHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              {tSolution('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {tSolution('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Card 1: HITL */}
            <div
              ref={solutionCardRefs[0]}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${solutionCardVisibility[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-sans">
                  {tSolution('hitl.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                {tSolution('hitl.description')}
              </p>
            </div>

            {/* Card 2: Orchestration */}
            <div
              ref={solutionCardRefs[1]}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${solutionCardVisibility[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-sans">
                  {tSolution('orchestration.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                {tSolution('orchestration.description')}
              </p>
            </div>

            {/* Card 3: Privacy */}
            <div
              ref={solutionCardRefs[2]}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${solutionCardVisibility[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-sans">
                  {tSolution('privacy.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                {tSolution('privacy.description')}
              </p>
            </div>

            {/* Card 4: Capacity */}
            <div
              ref={solutionCardRefs[3]}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${solutionCardVisibility[3] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-sans">
                  {tSolution('capacity.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                {tSolution('capacity.description')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/login"
              variant="primary"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg px-8"
            >
              {tSolution('getStarted')}
            </CTAButton>
            <CTAButton
              href="/privacy"
              variant="secondary"
              size="lg"
              className="text-foreground hover:bg-secondary border border-border px-8"
            >
              {tSolution('learnMore')}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-24 bg-background border-b border-border relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={servicesHeaderRef}
            className={`text-center mb-16 transition-all duration-1000 ${isServicesHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              {tServices('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {tServices('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Drafting Engine */}
            <div
              ref={servicesCardRefs[0]}
              className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${servicesCardVisibility[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-sans">
                  {tServices('draftingEngine.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 font-sans">{tServices('draftingEngine.description')}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="text-sm font-medium text-muted-foreground font-sans block">
                  {tServices('draftingEngine.tag')}
                </span>
              </div>
            </div>

            {/* Card 2: Contracts */}
            <div
              ref={servicesCardRefs[1]}
              className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${servicesCardVisibility[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-sans">
                  {tServices('contracts.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 font-sans">{tServices('contracts.description')}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="text-sm font-medium text-muted-foreground font-sans block">
                  {tServices('contracts.tag')}
                </span>
              </div>
            </div>

            {/* Card 3: Orchestration */}
            <div
              ref={servicesCardRefs[2]}
              className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 group ${servicesCardVisibility[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-sans">
                  {tServices('orchestration.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 font-sans">{tServices('orchestration.description')}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="text-sm font-medium text-muted-foreground font-sans block">
                  {tServices('orchestration.tag')}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/login"
              variant="primary"
              size="lg"
              className="px-8 shadow-lg hover:shadow-xl"
            >
              {tServices('viewAll')}
            </CTAButton>
            <CTAButton
              href="/privacy"
              variant="secondary"
              size="lg"
              className="px-8"
            >
              {tServices('getQuote')}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-background border-b border-border relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={testimonialsHeaderRef}
            className={`text-center mb-20 transition-all duration-1000 ${isTestimonialsHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              {tTestimonials('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {tTestimonials('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Persona 1 */}
            <div
              ref={testimonialsCardRefs[0]}
              className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 ${testimonialsCardVisibility[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-sans">
                {tTestimonials('client1.profile')}
              </h4>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 font-sans text-sm">
                  <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-1">{tTestimonials('challengeLabel')}</span>
                  {tTestimonials('client1.challenge')}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-sans text-sm">
                  <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-1">{tTestimonials('reliefLabel')}</span>
                  {tTestimonials('client1.relief')}
                </p>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-muted-foreground font-medium font-sans text-sm">
                    {tTestimonials('client1.metric')}
                  </p>
                </div>
              </div>
            </div>

            {/* Persona 2 */}
            <div
              ref={testimonialsCardRefs[1]}
              className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 ${testimonialsCardVisibility[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-sans">
                {tTestimonials('client2.profile')}
              </h4>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 font-sans text-sm">
                  <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-1">{tTestimonials('challengeLabel')}</span>
                  {tTestimonials('client2.challenge')}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-sans text-sm">
                  <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-1">{tTestimonials('reliefLabel')}</span>
                  {tTestimonials('client2.relief')}
                </p>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-muted-foreground font-medium font-sans text-sm">
                    {tTestimonials('client2.metric')}
                  </p>
                </div>
              </div>
            </div>

            {/* Persona 3 */}
            <div
              ref={testimonialsCardRefs[2]}
              className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700 hover:-translate-y-2 ${testimonialsCardVisibility[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-sans">
                {tTestimonials('client3.profile')}
              </h4>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 font-sans text-sm">
                  <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-1">{tTestimonials('challengeLabel')}</span>
                  {tTestimonials('client3.challenge')}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-sans text-sm">
                  <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-1">{tTestimonials('reliefLabel')}</span>
                  {tTestimonials('client3.relief')}
                </p>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-muted-foreground font-medium font-sans text-sm">
                    {tTestimonials('client3.metric')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/login"
              variant="primary"
              size="lg"
              className="px-8 shadow-lg hover:shadow-xl"
            >
              {tTestimonials('join')}
            </CTAButton>
            <CTAButton
              href="/blog"
              variant="secondary"
              size="lg"
              className="px-8"
            >
              {tTestimonials('guide')}
            </CTAButton>
          </div>
        </div>
      </section >

      {/* FAQs Section */}
      <section className="py-24 bg-background border-b border-border relative overflow-hidden">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={faqHeaderRef}
            className={`text-center mb-16 transition-all duration-1000 ${isFaqHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              {tFaq('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {tFaq('description')}
            </p>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-8">
                    {tFaq(`q${index}.question`)}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${openFaq === index ? 'transform rotate-180' : ''
                      }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 pb-4 pt-2">
                    <p className="text-gray-600 dark:text-gray-300">{tFaq(`q${index}.answer`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/questions-and-answers" variant="primary" size="lg">
              {tFaq('viewAll')}
            </CTAButton>
            <CTAButton href="/contact" variant="secondary" size="lg">
              {tFaq('askQuestion')}
            </CTAButton>
          </div>
        </div>
      </section >

      {/* Contact Us Section */}
      <section className="py-16 bg-background border-b border-border relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={contactHeaderRef}
            className={`text-center mb-12 transition-all duration-1000 ${isContactHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              {tContact('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {tContact('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* WhatsApp Card */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-sans">{tContact('whatsapp.title')}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-sans">
                {tContact('whatsapp.description')}
              </p>
              <a
                href="https://wa.me/18156620760"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors mb-4 shadow-md font-sans"
              >
                {tContact('whatsapp.cta')}
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic border-t border-gray-100 dark:border-gray-800 pt-4 font-sans">
                {tContact('whatsapp.usage')}
              </p>
            </div>

            {/* Enterprise Card */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-sans">{tContact('enterprise.title')}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-sans">
                {tContact('enterprise.description')}
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6 font-sans">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  {tContact('enterprise.point1')}
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  {tContact('enterprise.point2')}
                </li>
              </ul>
            </div>

            {/* Security Card */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-sans">{tContact('security.title')}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-sans">
                {tContact('security.description')}
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6 font-sans">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  {tContact('security.point1')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout >
  );
}
