import json

from pathlib import Path

from flask import Blueprint
from flask_babel import gettext as _

# pylint: disable=invalid-name
blueprint = Blueprint(
    'AngelcamConnector',
    __name__,
    url_prefix='/angelcam-connector/api',
)

BASE_DIR = Path(__file__).parent

# pylint: disable=invalid-name
angelcam_connector = {
    'blueprint': blueprint,
    'js_app_path': 'reforis_angelcam_connector/js/app.min.js',
    'translations_path': BASE_DIR / 'translations',
}


@blueprint.route('/uuid', methods=['GET'])
def get_uuid():
    data = load_file_content('/var/lib/angelcam-connector/identity.json')
    if data is None:
        return 'N/A'
    return json.loads(data)['uuid']


@blueprint.route('/status', methods=['GET'])
def get_status():
    return load_file_content('/var/lib/angelcam-connector/state') or 'N/A'


@blueprint.route('/logs', methods=['GET'])
def get_logs():
    logs = load_file_content('/var/log/messages')
    lines = (line for line in logs.split('\n') if "angelcam-connector" in line)
    return '\n'.join(lines)


def load_file_content(file):
    try:
        with open(file, 'rt') as f:
            return f.read()
    except:
        return None
