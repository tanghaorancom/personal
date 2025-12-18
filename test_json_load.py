import json
import urllib.request

# 测试多个JSON模块文件加载功能
def test_json_module(url, module_name):
    try:
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode('utf-8'))
        print(f'✅ 成功加载 {module_name} 模块！')
        return data
    except Exception as e:
        print(f'❌ 加载 {module_name} 模块失败: {str(e)}')
        return None

# 启动本地服务器提示
print('请确保已在项目根目录启动本地服务器：python -m http.server 8000')
print('开始测试JSON模块加载...\n')

# 测试各个JSON模块
server_url = 'http://localhost:8000/info/'

# 测试基本信息模块
basic_info = test_json_module(f'{server_url}basic_info.json', '基本信息')
if basic_info:
    print(f'   姓名: {basic_info["name"]}')
    print(f'   职业: {basic_info["occupation"]}')
    print(f'   经验: {basic_info["experience"]}')
print()

# 测试教育背景模块
education = test_json_module(f'{server_url}education.json', '教育背景')
if education:
    print(f'   已加载 {len(education)} 条教育记录')
    if len(education) > 0:
        print(f'   最新学历: {education[0]["degree"]}')
print()

# 测试工作经历模块
work_experience = test_json_module(f'{server_url}work_experience.json', '工作经历')
if work_experience:
    print(f'   已加载 {len(work_experience)} 条工作记录')
    if len(work_experience) > 0:
        print(f'   最新职位: {work_experience[0]["position"]}')
print()

# 测试技能证书模块
certifications = test_json_module(f'{server_url}certifications.json', '技能证书')
if certifications:
    print(f'   已加载 {len(certifications)} 份证书')
    if len(certifications) > 0:
        print(f'   最新证书: {certifications[0]["name"]}')
print()

# 测试个人兴趣模块
interests = test_json_module(f'{server_url}interests.json', '个人兴趣')
if interests:
    print(f'   已加载 {len(interests)} 个兴趣爱好')
    if len(interests) > 0:
        print(f'   兴趣示例: {interests[0]["name"]}')
print()

# 测试自我评价模块
self_evaluation = test_json_module(f'{server_url}self_evaluation.json', '自我评价')
if self_evaluation:
    print(f'   个人简介已加载')
    print(f'   职业目标: {self_evaluation["careerGoals"]}')
print()

# 测试在校经历模块
campus_experience = test_json_module(f'{server_url}campus_experience.json', '在校经历')
if campus_experience:
    print(f'   已加载 {len(campus_experience)} 条在校经历')
    if len(campus_experience) > 0:
        print(f'   在校经历示例: {campus_experience[0]["organization"]}')

print('\n所有模块测试完成！')
