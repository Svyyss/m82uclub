from flask import url_for, Flask, render_template, request, session, jsonify
import sys, json, os
application = Flask(__name__)

@application.route("/", methods=['GET', 'POST'])
def login():
    return render_template("login/Public/Default1c189.html")

####################################################################################################
####################################################################################################

@application.route('/Hidden')
def hidden():
    return render_template('main/Hidden.html')

@application.route('/SingleLogin')
def single_login():
    return render_template('main/SingleLogin.html')

@application.route('/header')
def header():
    return render_template('main/header.html')

@application.route('/Menu')
def menu():
    return render_template('main/Menu.html')

@application.route('/accinfo')
def accinfo():
    return render_template('main/accinfo.html')

@application.route("/main", methods=['GET', 'POST'])
def main():
    if request.method == 'GET':
            pass
    elif request.method == 'POST':
        id = request.form["txtUserName"]
        pw = request.form["txtPassword"]

        if id == "Svyyss" and pw == "Aaaa8888":
            return render_template('main/index.html')

        
        else:
            return render_template("login/Public/Default1c189.html")
        
####################################################################################################
####################################################################################################

@application.route('/report')
def report():

    with open('data2.json', 'r') as file:
        data = json.load(file)

    account = data.get("1")
    return render_template('report/hello/bye/accinfo_copy.html', account=account)

####################################################################################################
####################################################################################################

@application.route('/hiddenpage')
def hiddenpage():
    return render_template('report/hello/bye/hiddenpage.html')

####################################################################################################
####################################################################################################

@application.route('/matchinput', methods=['POST'])
def matchinput():
    try:
        # 파일에서 정보를 불러옴
        with open('data.json', 'r') as file:
            data_dict = json.load(file)
    except FileNotFoundError:
        data_dict = {}

    # 입력된 정보를 가져옴
    new_info = {}
    new_info['id'] = request.form['id']
    new_info['Trans.Time'] = request.form['trans-time']  # 'Trans.Time' 대신 'trans-time' 사용
    new_info['Choice'] = request.form['choice']
    new_info['Odds'] = request.form['odds']
    new_info['Stake'] = request.form['stake']
    new_info['Win/Lose'] = request.form['win-lose']
    new_info['Status'] = request.form['status']
    new_info['Master PT/ Comm'] = request.form['master-pt-comm']
    new_info['AgentPT/ Comm'] = request.form['agent-pt-comm']  # 'AgentPT/ Comm' 대신 'agent-pt-comm' 사용

    # 입력된 id가 이미 존재하는지 확인하고 중복 방지 처리
    new_id = new_info['id']
    count = 1
    while new_id in data_dict:
        new_id = new_info['id'] + str(count)
        count += 1
    new_info['id'] = new_id

    # 새로운 정보를 딕셔너리에 추가
    data_dict[new_id] = new_info

    # 파일에 정보를 저장
    with open('data.json', 'w') as file:
        json.dump(data_dict, file, indent=4)

    return render_template('main/index.html')

####################################################################################################

@application.route('/accountinput', methods=['POST'])
def accountinput():
    # HTML 폼에서 전송된 데이터를 가져옴
    data = request.form

    # JSON 파일의 경로
    json_file_path = 'data2.json'

    # JSON 파일이 존재하는지 확인하고 데이터를 불러옴
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r') as file:
            data_dict = json.load(file)
    else:
        # JSON 파일이 없을 경우 빈 딕셔너리로 초기화
        data_dict = {}

    # ID를 키로 사용하여 데이터를 저장
    id = data.get('id')
    data_dict[id] = {
        'Contact': data.get('contact'),
        'Cur': data.get('cur'),
        'Turnover': data.get('turnover'),
        'Valid_Amount': data.get('valid-amount'),
        'Stake_Count': data.get('stake-count'),
        'Gross_Comm': data.get('gross-comm'),
        'Member': data.get('member'),
        'Member2': data.get('member2'),
        'Member3': data.get('member3'),
        'Agent': data.get('agent'),
        'Agent2': data.get('agent2'),
        'Agent3': data.get('agent3'),
        'Agent4': data.get('agent4'),
        'Master': data.get('master'),
        'Master2': data.get('master2'),
        'Master3': data.get('master3'),
        'Master4': data.get('master4'),
        'Company': data.get('company'),
        'Company2': data.get('company2'),
        'Company3': data.get('company3'),
        'Company4': data.get('company4')
    }

    # JSON 파일에 데이터를 저장
    with open(json_file_path, 'w') as file:
        json.dump(data_dict, file, indent=4)

    # 저장이 완료된 후에는 홈페이지로 리다이렉트할 수도 있습니다.
    return render_template('main/index.html')

####################################################################################################
####################################################################################################

@application.route('/accessaccount', methods=['POST'])
def access_account():
    # POST 요청에서 ID 추출
    id = request.form.get('id')

    # JSON 파일에서 데이터 로드
    with open('data2.json', 'r') as file:
        data = json.load(file)

    # ID에 해당하는 정보 가져오기
    account = data.get(id)

    # ID에 해당하는 정보가 없을 경우 에러 반환
    if not account:
        return jsonify({'error': 'ID not found'}), 404
    
###
    
    with open('data.json', 'r') as file:
        data_dict = json.load(file)

    # 입력된 ID의 앞부분과 일치하는 모든 딕셔너리 정보를 리스트에 저장
    info_list = []
    for key, value in data_dict.items():
        if key.startswith(id):
            info_list.append({
                'ID': key,
                'Trans_Time': value.get('Trans.Time', ''),
                'Choice': value.get('Choice', ''),
                'Odds': value.get('Odds', ''),
                'Stake': value.get('Stake', ''),
                'Win_Lose': value.get('Win/Lose', ''),
                'Status': value.get('Status', ''),
                'Master_PT_Comm': value.get('Master PT/ Comm', ''),
                'Agent_PT_Comm': value.get('Agent PT/ Comm', '')
            })

###

    # HTML로 데이터 렌더링하여 반환
    return render_template('report/hello/bye/accinfo_full.html', account=account, id=id, info_list=info_list)

@application.route('/allids', methods=['GET'])
def get_all_ids():
    # data2.json 파일에서 모든 id 목록을 가져오는 코드 작성
    with open('data2.json', 'r') as file:
        data = json.load(file)
        all_ids = list(data.keys())

    # JSON 형식으로 반환
    return jsonify(all_ids)

####################################################################################################

@application.route('/accessmatch', methods=['POST'])
def access_match():
    id_prefix = request.form['id']

    with open('data.json', 'r') as file:
        data_dict = json.load(file)

    # 입력된 ID의 앞부분과 일치하는 모든 딕셔너리 정보를 리스트에 저장
    info_list = []
    for key, value in data_dict.items():
        if key.startswith(id_prefix):
            info_list.append({
                'ID': key,
                'Trans_Time': value.get('Trans.Time', ''),
                'Choice': value.get('Choice', ''),
                'Odds': value.get('Odds', ''),
                'Stake': value.get('Stake', ''),
                'Win_Lose': value.get('Win/Lose', ''),
                'Status': value.get('Status', ''),
                'Master_PT_Comm': value.get('Master PT/ Comm', ''),
                'Agent_PT_Comm': value.get('Agent PT/ Comm', '')
            })

    return render_template('info.html', info_list=info_list)




if __name__ == "__main__":
    application.run()