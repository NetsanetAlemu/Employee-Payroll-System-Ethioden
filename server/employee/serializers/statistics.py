from rest_framework import serializers
from employee.models import *
from django.db import models
from month import Month
from employee.utils.salary_calculator import SalaryCalculator


class StatisticsSerializer(serializers.Serializer):
    total_employees = serializers.SerializerMethodField(read_only=True)
    curr_month_tax = serializers.SerializerMethodField(read_only=True)
    curr_month_allowances = serializers.SerializerMethodField(read_only=True)
    curr_month_deductions = serializers.SerializerMethodField(read_only=True)
    curr_month_payment_amount = serializers.SerializerMethodField(
        read_only=True)

    class Meta:
        model = Payment
        fields = ("total_employees", "curr_month_tax",
                  "curr_month_allowances", "curr_month_deductions",  "curr_month_payment_amount")

    def get_total_employees(self, obj):
        return Employee.objects.all().count()

    def get_curr_month_tax(self, obj: Payment):
        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        sum_month_paymnets = 0
        for curr_month_paymnet in curr_month_paymnets:
            calculator = SalaryCalculator(curr_month_paymnet.salary)
            calculator.calc_income_tax()
            sum_month_paymnets += calculator.income_tax
        return sum_month_paymnets

    def get_curr_month_allowances(self, obj):

        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        allowances = []
        for curr_month_payment in curr_month_paymnets:
            allowance = (curr_month_payment.salary.allowances.aggregate(
                allowance=models.Sum("allowance_rate")))
            if allowance['allowance'] is not None:
                allowances.append(
                    allowance["allowance"] * curr_month_payment.salary.basic_salary)
        return sum(allowances) / 100

    def get_curr_month_deductions(self, obj):

        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        deductions = []
        for curr_month_payment in curr_month_paymnets:
            deduction = (curr_month_payment.salary.deductions.aggregate(
                deduction=models.Sum("deduction_rate")))
            if deduction['deduction'] is not None:
                deductions.append(
                    deduction["deduction"] * curr_month_payment.salary.basic_salary)
        return sum(deductions) / 100

    def get_curr_month_payment_amount(self, obj):
        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        acc = 0
        for curr_month_payment in curr_month_paymnets:
            calculator = SalaryCalculator(curr_month_payment.salary)
            calculator.calc_net_salary()
            acc += calculator.net_salary
        return acc