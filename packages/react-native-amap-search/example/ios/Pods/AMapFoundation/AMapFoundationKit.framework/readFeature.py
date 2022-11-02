# -*- coding: utf-8-*-
import os
import sys

currentPath=os.getcwd()
foundationConfigPath = currentPath + "/AMapFoundationKit/AMapFoundationConfig.h"

#currentPath.replace("src", "src/AMapFoundationKit/AMapFoundationConfig.h")

report_crash=sys.argv[1]

def replaceFeature():
    # 如果Jenkins配置不需要替换，则直接返回
    if report_crash == 1 or report_crash == '1':

        search_text  = "define FEATURE_REPORT_CRASH 0"
        replace_text = "define FEATURE_REPORT_CRASH 1"

        with open(foundationConfigPath, 'r') as file:
            data = file.read()
            data = data.replace(search_text, replace_text)

        with open(foundationConfigPath, 'w') as file:
            file.write(data)

replaceFeature()
