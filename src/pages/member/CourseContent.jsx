import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FiArrowLeft, FiPlay, FiCheck, FiLock, FiDownload, FiChevronRight, FiChevronDown } from 'react-icons/fi';

const CourseContent = () => {
  const { id } = useParams();
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock course data
        const courseData = {
          id: parseInt(id),
          name: 'Advanced Web Development Course',
          description: 'Master modern web development with this comprehensive course. Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and gain practical experience that will help you land your dream job or create your own web applications.',
          progress: 65,
          thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          modules: [
            {
              id: 1,
              title: 'Introduction to Web Development',
              description: 'Get started with the basics of web development and set up your development environment.',
              completed: true,
              lessons: [
                {
                  id: 1,
                  title: 'Course Overview',
                  duration: '10:15',
                  type: 'video',
                  completed: true,
                  video_url: 'https://example.com/videos/course-overview.mp4'
                },
                {
                  id: 2,
                  title: 'Setting Up Your Development Environment',
                  duration: '15:30',
                  type: 'video',
                  completed: true,
                  video_url: 'https://example.com/videos/dev-environment.mp4'
                },
                {
                  id: 3,
                  title: 'Web Development Basics',
                  duration: '20:45',
                  type: 'video',
                  completed: true,
                  video_url: 'https://example.com/videos/web-basics.mp4'
                }
              ]
            },
            {
              id: 2,
              title: 'HTML & CSS Fundamentals',
              description: 'Learn the building blocks of web pages and how to style them beautifully.',
              completed: true,
              lessons: [
                {
                  id: 4,
                  title: 'HTML Structure and Elements',
                  duration: '25:10',
                  type: 'video',
                  completed: true,
                  video_url: 'https://example.com/videos/html-structure.mp4'
                },
                {
                  id: 5,
                  title: 'CSS Selectors and Properties',
                  duration: '30:20',
                  type: 'video',
                  completed: true,
                  video_url: 'https://example.com/videos/css-selectors.mp4'
                },
                {
                  id: 6,
                  title: 'Responsive Design Principles',
                  duration: '28:15',
                  type: 'video',
                  completed: true,
                  video_url: 'https://example.com/videos/responsive-design.mp4'
                },
                {
                  id: 7,
                  title: 'HTML & CSS Project',
                  type: 'project',
                  completed: true,
                  project_description: 'Build a responsive portfolio website using HTML and CSS.',
                  resources: [
                    { name: 'Project Brief', url: 'https://example.com/resources/portfolio-brief.pdf' },
                    { name: 'Starter Files', url: 'https://example.com/resources/portfolio-starter.zip' }
                  ]
                }
              ]
            },
            {
              id: 3,
              title: 'JavaScript Essentials',
              description: 'Master the programming language of the web and add interactivity to your sites.',
              completed: false,
              lessons: [
                {
                  id: 8,
                  title: 'JavaScript Syntax and Variables',
                  duration: '22:30',
                  type: 'video',
                  completed: true,
                  video_url: 'https://example.com/videos/js-syntax.mp4'
                },
                {
                  id: 9,
                  title: 'Functions and Control Flow',
                  duration: '26:45',
                  type: 'video',
                  completed: true,
                  video_url: 'https://example.com/videos/js-functions.mp4'
                },
                {
                  id: 10,
                  title: 'DOM Manipulation',
                  duration: '32:15',
                  type: 'video',
                  completed: false,
                  video_url: 'https://example.com/videos/dom-manipulation.mp4'
                },
                {
                  id: 11,
                  title: 'Events and Event Handling',
                  duration: '24:50',
                  type: 'video',
                  completed: false,
                  video_url: 'https://example.com/videos/events.mp4'
                },
                {
                  id: 12,
                  title: 'JavaScript Project',
                  type: 'project',
                  completed: false,
                  project_description: 'Build an interactive to-do list application with JavaScript.',
                  resources: [
                    { name: 'Project Brief', url: 'https://example.com/resources/todo-brief.pdf' },
                    { name: 'Starter Files', url: 'https://example.com/resources/todo-starter.zip' }
                  ]
                }
              ]
            },
            {
              id: 4,
              title: 'React Fundamentals',
              description: 'Learn the popular JavaScript library for building user interfaces.',
              completed: false,
              lessons: [
                {
                  id: 13,
                  title: 'Introduction to React',
                  duration: '28:10',
                  type: 'video',
                  completed: false,
                  locked: true,
                  video_url: 'https://example.com/videos/react-intro.mp4'
                },
                {
                  id: 14,
                  title: 'Components and Props',
                  duration: '35:25',
                  type: 'video',
                  completed: false,
                  locked: true,
                  video_url: 'https://example.com/videos/react-components.mp4'
                },
                {
                  id: 15,
                  title: 'State and Lifecycle',
                  duration: '30:40',
                  type: 'video',
                  completed: false,
                  locked: true,
                  video_url: 'https://example.com/videos/react-state.mp4'
                },
                {
                  id: 16,
                  title: 'React Hooks',
                  duration: '38:15',
                  type: 'video',
                  completed: false,
                  locked: true,
                  video_url: 'https://example.com/videos/react-hooks.mp4'
                },
                {
                  id: 17,
                  title: 'React Project',
                  type: 'project',
                  completed: false,
                  locked: true,
                  project_description: 'Build a weather application using React and a weather API.',
                  resources: [
                    { name: 'Project Brief', url: 'https://example.com/resources/weather-brief.pdf' },
                    { name: 'Starter Files', url: 'https://example.com/resources/weather-starter.zip' }
                  ]
                }
              ]
            },
            {
              id: 5,
              title: 'Node.js and Backend Development',
              description: 'Explore server-side JavaScript and build your own APIs.',
              completed: false,
              lessons: [
                {
                  id: 18,
                  title: 'Introduction to Node.js',
                  duration: '25:30',
                  type: 'video',
                  completed: false,
                  locked: true,
                  video_url: 'https://example.com/videos/node-intro.mp4'
                },
                {
                  id: 19,
                  title: 'Express.js Framework',
                  duration: '32:45',
                  type: 'video',
                  completed: false,
                  locked: true,
                  video_url: 'https://example.com/videos/express.mp4'
                },
                {
                  id: 20,
                  title: 'RESTful API Development',
                  duration: '40:15',
                  type: 'video',
                  completed: false,
                  locked: true,
                  video_url: 'https://example.com/videos/rest-api.mp4'
                },
                {
                  id: 21,
                  title: 'Database Integration',
                  duration: '35:50',
                  type: 'video',
                  completed: false,
                  locked: true,
                  video_url: 'https://example.com/videos/database.mp4'
                },
                {
                  id: 22,
                  title: 'Backend Project',
                  type: 'project',
                  completed: false,
                  locked: true,
                  project_description: 'Build a complete REST API for a blog application.',
                  resources: [
                    { name: 'Project Brief', url: 'https://example.com/resources/blog-api-brief.pdf' },
                    { name: 'Starter Files', url: 'https://example.com/resources/blog-api-starter.zip' }
                  ]
                }
              ]
            }
          ]
        };
        
        setCourse(courseData);
        
        // Set initial active module and lesson
        const firstIncompleteModule = courseData.modules.find(module => !module.completed);
        if (firstIncompleteModule) {
          setActiveModule(firstIncompleteModule);
          const firstIncompleteLesson = firstIncompleteModule.lessons.find(lesson => !lesson.completed && !lesson.locked);
          if (firstIncompleteLesson) {
            setActiveLesson(firstIncompleteLesson);
          } else {
            setActiveLesson(firstIncompleteModule.lessons[0]);
          }
        } else {
          setActiveModule(courseData.modules[0]);
          setActiveLesson(courseData.modules[0].lessons[0]);
        }
        
        // Set all modules as expanded initially
        const expanded = {};
        courseData.modules.forEach(module => {
          expanded[module.id] = true;
        });
        setExpandedModules(expanded);
        
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id, supabase]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleLessonClick = (module, lesson) => {
    if (lesson.locked) return;
    
    setActiveModule(module);
    setActiveLesson(lesson);
  };

  const markLessonComplete = async () => {
    try {
      // For demo purposes, we'll just update the state
      // In a real app, you would update this in your database
      
      const updatedCourse = { ...course };
      const moduleIndex = updatedCourse.modules.findIndex(m => m.id === activeModule.id);
      const lessonIndex = updatedCourse.modules[moduleIndex].lessons.findIndex(l => l.id === activeLesson.id);
      
      updatedCourse.modules[moduleIndex].lessons[lessonIndex].completed = true;
      
      // Check if all lessons in the module are completed
      const allLessonsCompleted = updatedCourse.modules[moduleIndex].lessons.every(lesson => lesson.completed);
      if (allLessonsCompleted) {
        updatedCourse.modules[moduleIndex].completed = true;
      }
      
      // Update progress
      const totalLessons = updatedCourse.modules.reduce((total, module) => total + module.lessons.length, 0);
      const completedLessons = updatedCourse.modules.reduce((total, module) => 
        total + module.lessons.filter(lesson => lesson.completed).length, 0);
      
      updatedCourse.progress = Math.round((completedLessons / totalLessons) * 100);
      
      setCourse(updatedCourse);
      
      // Move to next lesson if available
      const currentModuleLessons = updatedCourse.modules[moduleIndex].lessons;
      if (lessonIndex < currentModuleLessons.length - 1) {
        // Next lesson in same module
        setActiveLesson(currentModuleLessons[lessonIndex + 1]);
      } else if (moduleIndex < updatedCourse.modules.length - 1) {
        // First lesson in next module
        const nextModule = updatedCourse.modules[moduleIndex + 1];
        setActiveModule(nextModule);
        setActiveLesson(nextModule.lessons[0]);
        // Ensure the next module is expanded
        setExpandedModules(prev => ({
          ...prev,
          [nextModule.id]: true
        }));
      }
      
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4">
        Course not found
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/member')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
          <div className="flex items-center">
            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
              <div 
                className="bg-primary-600 h-2.5 rounded-full" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500">{course.progress}% complete</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeLesson && (
            <Card className="mb-6">
              {activeLesson.type === 'video' ? (
                <div>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-800 flex items-center justify-center">
                    {activeLesson.locked ? (
                      <div className="text-center text-white">
                        <FiLock size={48} className="mx-auto mb-2" />
                        <p>This lesson is locked</p>
                        <p className="text-sm">Complete previous lessons to unlock</p>
                      </div>
                    ) : (
                      <div className="text-center text-white">
                        <FiPlay size={48} className="mx-auto mb-2" />
                        <p>Video Player</p>
                        <p className="text-sm">{activeLesson.title}</p>
                      </div>
                    )}
                  </div>
                  <Card.Body>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold">{activeLesson.title}</h2>
                        <p className="text-gray-500">
                          {activeModule.title} • {activeLesson.duration}
                        </p>
                      </div>
                      {!activeLesson.locked && !activeLesson.completed && (
                        <Button 
                          variant="primary"
                          onClick={markLessonComplete}
                        >
                          <FiCheck className="mr-2" />
                          Mark as Complete
                        </Button>
                      )}
                      {activeLesson.completed && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </div>
              ) : (
                <Card.Body>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{activeLesson.title}</h2>
                      <p className="text-gray-500">
                        {activeModule.title} • Project
                      </p>
                    </div>
                    {!activeLesson.locked && !activeLesson.completed && (
                      <Button 
                        variant="primary"
                        onClick={markLessonComplete}
                      >
                        <FiCheck className="mr-2" />
                        Mark as Complete
                      </Button>
                    )}
                    {activeLesson.completed && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    )}
                  </div>
                  
                  {activeLesson.locked ? (
                    <div className="text-center py-8">
                      <FiLock size={48} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-700">This project is locked</p>
                      <p className="text-sm text-gray-500">Complete previous lessons to unlock</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 mb-4">{activeLesson.project_description}</p>
                      
                      <h3 className="text-lg font-medium mb-2">Resources</h3>
                      <div className="space-y-2">
                        {activeLesson.resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                            <span className="text-gray-700">{resource.name}</span>
                            <Button variant="outline" size="sm">
                              <FiDownload className="mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              )}
            </Card>
          )}
          
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">About This Course</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-700">{course.description}</p>
            </Card.Body>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">Course Content</h2>
            </Card.Header>
            <div className="overflow-y-auto max-h-[600px]">
              {course.modules.map((module) => (
                <div key={module.id} className="border-b border-gray-200 last:border-b-0">
                  <button
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 focus:outline-none"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center">
                      {module.completed ? (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                          <FiCheck className="text-white" size={12} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2"></div>
                      )}
                      <span className="font-medium text-gray-900">{module.title}</span>
                    </div>
                    {expandedModules[module.id] ? (
                      <FiChevronDown className="text-gray-500" />
                    ) : (
                      <FiChevronRight className="text-gray-500" />
                    )}
                  </button>
                  
                  {expandedModules[module.id] && (
                    <div className="pl-11 pr-4 pb-3">
                      <p className="text-sm text-gray-500 mb-2">{module.description}</p>
                      <ul className="space-y-1">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id}>
                            <button
                              className={`w-full text-left py-2 px-3 rounded-md flex items-center justify-between ${
                                activeLesson && activeLesson.id === lesson.id
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'hover:bg-gray-50'
                              } ${lesson.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                              onClick={() => handleLessonClick(module, lesson)}
                              disabled={lesson.locked}
                            >
                              <div className="flex items-center">
                                {lesson.completed ? (
                                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mr-2">
                                    <FiCheck className="text-white" size={10} />
                                  </div>
                                ) : lesson.locked ? (
                                  <FiLock className="w-4 h-4 mr-2 text-gray-400" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                                )}
                                <span className="text-sm">
                                  {lesson.title}
                                  {lesson.type === 'project' && (
                                    <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                      Project
                                    </span>
                                  )}
                                </span>
                              </div>
                              {lesson.duration && (
                                <span className="text-xs text-gray-500">{lesson.duration}</span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
