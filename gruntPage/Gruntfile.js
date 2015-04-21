'use strict';

module.exports = function(grunt) {

    // 执行时间
    require('time-grunt')(grunt);

    // paths 
    var config = {
        app: 'app',
        dist: 'dist',
        dev: 'dev'
    }

    var sftpConfig = grunt.file.readJSON('sftpConfig.json');
	
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		sftpConfig: sftpConfig,
        config: config,
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.dev %>/{,*/}*',
                    '<%= config.dev %>/{,*/}*.css',
                    '<%= config.dev %>/images/{,*/}*'
                ]
            }
        },
        // grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729 // This does not perform live reloading. this port is used by watch task to trigger a live reloading action.
            },
            livereload: {
                options: {
                  open: true,
                  base: [
                    '<%= config.dev %>'
                  ]
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }    
            }
        },
        // 重命名文件，浏览器缓存
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            files: {
                src: [
                    '<%= config.dist %>/js/{,*/}{,*/}*.js',
                    '<%= config.dist %>/css/{,*/}*.css',
                    '<%= config.dist %>/images/{,*/}*.*'
                ]
            }
        },
        // 资源定位前置任务
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            php: '<%= config.dev %>/{,*/}*.php',
            html: '<%= config.dev %>/{,*/}*.html'
        },
        // 资源定位后置任务
        usemin: {
            html: ['<%= config.dist %>/{,*/}*.html'],
            php: ['<%= config.dist %>/{,*/}*.php'],
            js: ['<%= config.dist %>/js/{,*/}{,*/}*.js'],
            css: ['<%= config.dist %>/css/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images',
                    '<%= config.dist %>/js',
                    '<%= config.dist %>/css'
                ]
            }
        },
        // 复制
        copy: {
            main: {
                expand: true,
                dot: true,
                cwd: '<%= config.dev %>',
                src: [
                    // 'images/{,*/}*',
                    // 'css/{,*/}*.*',
                    // 'js/{,*/}{,*/}{,*/}*.*',
                    '{,*/}*.html',
                    '{,*/}*.php'
                ],
                dest: '<%= config.dist %>',
                filter: 'isFile'
            }
        },
        // 压缩
        uglify: {
            options: {
                report: 'gzip',
                banner: '/** \n' +
                        ' * @Description: <%= pkg.name%> \n' +
                        ' * @author: <%= pkg.author%> \n' +
                        ' * @Update: <%= grunt.template.today("yyyy-mm-dd HH:mm") %> \n' +
                        ' */ \n',
                beautify: {
                    //中文ascii化，非常有用！防止中文乱码的神配置
                    ascii_only: true
                }
            },
            seajs: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.dev %>/js/',
                        src: ['**/*.js', '!**/*-debug.js'],
                        dest: '<%= config.dist %>/js/',
                        ext: '.js'
                    }
                ]
            }
        },
        /* css压缩 */
        cssmin: {
            options: {
                report: 'gzip'
            },
            files: {
                expand: true,
                cwd: '<%= config.dev %>/css/',
                src: ['**/*.css', '!**/*.min.css'],
                dest: '<%= config.dist %>/css/',
                ext: '.css'
            }
        },
        /* 图片压缩 */
        imagemin: {
            options: {
                optimizationLevel: 3
            },
            files: {
                expand: true,
                cwd: '<%= config.dev %>/images/',
                src: ['**/*.{png,jpg,gif}'],
                dest: '<%= config.dist %>/images/'  
            }
        },
        // 清除文件
        clean: {
            dist: ['<%= config.dist %>']
        },
        jshint: {
            options: {
                //大括号包裹
                curly: true,
                //对于简单类型，使用===和!==，而不是==和!=
                eqeqeq: true,
                //对于首字母大写的函数（声明的类），强制使用new
                newcap: true,
                //禁用arguments.caller和arguments.callee
                noarg: true,
                //对于属性使用aaa.bbb而不是aaa['bbb']
                sub: true,
                //查找所有未定义变量
                undef: true,
                //查找类似与if(a = 0)这样的代码
                boss: true,
                //指定运行环境为node.js
                node: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            },
            files: {
                src: ['js/**/*.js']
            }
        },
        // 发布到FTP服务器
        'ftp-deploy': {  
            build: {
                auth: {
                    host: '<%= sftpConfig.host %>',
                    port: '<%= sftpConfig.port %>',
                    authKey: {
                        'username': '<%= sftpConfig.username %>',
                        'password': '<%= sftpConfig.password %>'
                    }
                },
                // 本地路径
                src: '<%= sftpConfig.src %>',
                // 服务器路径
                dest: '<%= sftpConfig.dest %>',
                exclusions: ['**/.git']
            }
        },
        'sftp-deploy': {
            build: {
                auth: {
                    host: '<%= sftpConfig.host %>',
                    port: '<%= sftpConfig.port %>',
                    authKey: {
                        'username': '<%= sftpConfig.username %>',
                        'password': '<%= sftpConfig.password %>'
                    }
                },
                // cache: 'sftpCache.json',
                // 本地路径
                src: '<%= sftpConfig.src %>',
                // 服务器路径
                dest: '<%= sftpConfig.dest %>',
                exclusions: [''],
                serverSep: '/',
                concurrency: 4,
                progress: true
            }
        }
    });
    
    // load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //输出进度日志
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + '文件: ' + filepath + ' 变动状态: ' + action);
    });
	
    // 执行 grunt serve 启动本地服务
    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist']);
        }

        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
        
    });

    // md5 全部文件都会修改
    // 执行 grunt build 生成文件到dist
	grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'copy',
        'cssmin',
        'uglify',
        'imagemin',
        'rev',
        'usemin'
    ]);

    // 执行 grunt pull ftp上传项目
    grunt.registerTask('pull', [
        'ftp-deploy'
    ]);

    grunt.registerTask('ssh', [
        'sftp-deploy'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
}
