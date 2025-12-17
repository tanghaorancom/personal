import json
import urllib.request

# 测试JSON数据加载功能
try:
    url = 'http://localhost:8000/info/personal_info.json'
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode('utf-8'))
    
    print('✅ 成功加载JSON数据！')
    print(f'姓名: {data["basicInfo"]["name"]}')
    print(f'性别: {data["basicInfo"]["gender"]}')
    print(f'出生年月: {data["basicInfo"]["birthDate"]}')
    print(f'职业: {data["basicInfo"]["occupation"]}')
    print(f'经验: {data["basicInfo"]["experience"]}')
    print(f'简介: {data["profile"]}')
    
except Exception as e:
    print(f'❌ 加载JSON数据失败: {str(e)}')
