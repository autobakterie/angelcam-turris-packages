# !/usr/bin/env python3

import copy
import pathlib

import setuptools
from setuptools.command.build_py import build_py

NAME = 'reforis_angelcam_connector'

BASE_DIR = pathlib.Path(__file__).absolute().parent


class AngelcamConnectorBuild(build_py):
    def run(self):
        # build package
        build_py.run(self)

        from reforis_distutils import ForisPluginBuild
        cmd = ForisPluginBuild(copy.copy(self.distribution))
        cmd.root_path = BASE_DIR
        cmd.module_name = NAME
        cmd.build_lib = self.build_lib
        cmd.ensure_finalized()
        cmd.run()


setuptools.setup(
    name=NAME,
    version='0.1.0',
    packages=setuptools.find_packages(exclude=['tests']),
    include_package_data=True,

    description='Angelcam Connector',
    author='Angelcam, Inc.',
    author_email='dev@angelcam.com',

    install_requires=[
        'flask',
        'Babel',
        'Flask-Babel',
        'reforis @ git+https://gitlab.nic.cz/turris/reforis/reforis#egg=reforis',
    ],
    extras_require={
        'devel': [
            'pytest',
            'pylint',
            'pylint-quotes',
            'pycodestyle',
        ],
    },
    setup_requires=[
        'reforis_distutils',
    ],
    dependency_links=[
        'git+https://gitlab.nic.cz/turris/reforis/reforis-distutils.git#egg=reforis-distutils',
    ],
    entry_points={
        'foris.plugins': f'{NAME} = {NAME}:angelcam_connector'
    },
    classifiers=[
        'Framework :: Flask',
        'Intended Audience :: Developers',
        'Development Status :: 3 - Alpha',
        'License :: Other/Proprietary License',
        'Natural Language :: English',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 3',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    cmdclass={
        'build_py': AngelcamConnectorBuild,
    },
    zip_safe=False,
)
