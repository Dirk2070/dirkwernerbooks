import { Award, BookOpen, Users, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

const Biography = () => {
  const { language, t } = useLanguage()

  const achievements = [
    {
      icon: <Award className="h-6 w-6" />,
      title: t('biography.experience'),
      color: 'text-blue-600'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('biography.certification'),
      color: 'text-green-600'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: t('biography.storyteller'),
      color: 'text-red-600'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: t('biography.published'),
      color: 'text-purple-600'
    }
  ]

  const specializations = [
    t('biography.methods'),
    t('biography.prevention'),
    t('biography.intelligence'),
    t('biography.counseling')
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('biography.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('biography.subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Author Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/author-photo.jpg"
                  alt="Dipl.-Psych. Dirk Werner"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Professional Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Biography Text */}
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-foreground">
                {t('biography.text')}
              </p>
            </div>

            {/* Professional Background */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                {t('biography.background')}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`${achievement.color} mt-1`}>
                      {achievement.icon}
                    </div>
                    <div className="text-sm text-foreground">
                      {achievement.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-8">
            {t('biography.specializations')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specializations.map((specialization, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <p className="text-foreground font-medium">
                      {specialization}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-8 lg:p-12 text-center">
          <blockquote className="text-xl lg:text-2xl font-medium text-foreground italic mb-4">
            {language === 'de' 
              ? '"Psychologie und Geschichtenerzählen verbinden sich in meiner Arbeit zu einem kraftvollen Werkzeug für Heilung und Verständnis."'
              : '"Psychology and storytelling combine in my work to create a powerful tool for healing and understanding."'
            }
          </blockquote>
          <cite className="text-muted-foreground font-medium">
            — Dipl.-Psych. Dirk Werner
          </cite>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">26+</div>
            <div className="text-muted-foreground">
              {language === 'de' ? 'Jahre Erfahrung' : 'Years Experience'}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">17+</div>
            <div className="text-muted-foreground">
              {language === 'de' ? 'Veröffentlichte Bücher' : 'Published Books'}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">4</div>
            <div className="text-muted-foreground">
              {language === 'de' ? 'Literarische Genres' : 'Literary Genres'}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
            <div className="text-muted-foreground">
              {language === 'de' ? 'Geholfen Patienten' : 'Patients Helped'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Biography

