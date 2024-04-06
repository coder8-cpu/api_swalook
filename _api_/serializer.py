from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from django.contrib import auth
from rest_framework import serializers
from .models import *
import datetime as dt
import random as r 
from rest_framework.authtoken.models import Token

class signup_serializer(ModelSerializer):
    class Meta:
        model = SwalookUserProfile
        fields = ["salon_name","mobile_no","email","owner_name"]
    def create(self, validated_data):
        # signup_obj.vendor_id      = name_[0:2] + str(a) + str(b) + str(c)
        #         get_ip                    = request.META.get('HTTP_X_FORWARDED_FOR') # ip
        #         if get_ip:
        #             self.ip               = get_ip.split(',')[0]
        #         else:
        #             self.ip               = request.META.get('REMOTE_ADDR')
        #         signup_obj.ip             = self.ip
        #         signup_obj.dev_limit      = 1
        #         signup_obj.gst_number     = 0
        #         signup_obj.s_gst_percent  = "0"
        #         signup_obj.c_gst_percent  = "0"
        #         signup_obj.save()
        a = r.randint(0,9)
        b = r.randint(0,9)
        c = r.randint(0,9)
        validated_data['vendor_id'] = validated_data["salon_name"][0:2] + str(int(a)) + str(int(b)) + str(int(c))
        validated_data['invoice_limit'] = 100
        validated_data['account_created_date'] = dt.date.today()
        get_ip                    = self.context.get('request').META.get('HTTP_X_FORWARDED_FOR') # ip
        if get_ip:
            ip               = get_ip.split(',')[0]
        else:
            ip               = self.context.get('request').META.get('REMOTE_ADDR')
        validated_data['user_ip'] = str(ip)
        validated_data['number_of_staff'] = "0"
        validated_data['s_gst_percent'] = "0"
        validated_data['c_gst_percent'] = "0"
        validated_data['current_billslno'] = "0"
        validated_data['appointment_limit'] = 100
        validated_data['invoice_generated'] = 0
        validated_data['appointment_generated'] = 0
        validated_data['gst_number'] = "0"
        validated_data['pan_number'] = "0"
        validated_data['pincode'] = "0"
        validated_data['profile_pic'] = "/data/inv.png/"
        user = User()
        user.username = validated_data['mobile_no']
        user.set_password("w!==?0id")
        user.save()
        return super().create(validated_data)
        
class login_serializer(serializers.Serializer):

    mobileno = serializers.CharField()
    password = serializers.CharField()

  
    def create(self, validated_data):
       
        user = auth.authenticate(username=validated_data['mobileno'],password=validated_data['password'])
        if user is not None:
           auth.login(self.context.get('request'),user)
       


        return "ok!"
    
class update_profile_serializer(serializers.Serializer):

    gst_number = serializers.CharField()
    profile_pic = serializers.ImageField()
    s_gst_percent = serializers.CharField()
    c_gst_percent = serializers.CharField()
  
    def update(self, validated_data):
       object = SwalookUserProfile.objects.get(mobile_no=str(self.context.get('request').user))
       object.profile_pic = self.context.get('request').FILES.get('profile_pic')
       object.gst_number = validated_data['gst_number']
       object.s_gst_percent = validated_data['s_gst_percent']
       object.c_gst_percent = validated_data['c_gst_percent']
       object.save()
       return super().update(validated_data)
    
        
    
class billing_serailizer(serializers.ModelSerializer):
    class Meta:
        model = VendorInvoice
        fields = ["customer_name","mobile_no","email","address","services","service_by","total_prise","total_quantity","total_tax","total_discount","grand_total","total_cgst","total_sgst","gst_number"]

    def create(self,validated_data):
        date = dt.date.today()
        mon = dt.date.today()
        m_ = mon.month
        y_ = mon.year
        if int(mon.day) >=1 and int(mon.day) <=7:

            validated_data['week'] = "1"
        if int(mon.day) >=8 and int(mon.day) <=15:
            validated_data['week'] = "2"
        if int(mon.day) >=16 and int(mon.day) <=23:
            validated_data['week']= "3"
        if int(mon.day) >=24 and int(mon.day) <=31:
            validated_data['week']= "4"
        
        v_id = SwalookUserProfile.objects.filter(mobile_no=str(self.context.get('request').user))
        slno = v_id[0].vendor_id.lower() + str(v_id[0].invoice_generated) + str(m_) + str(y_)
        validated_data['slno'] =  slno
        validated_data['vendor_name'] = self.context.get('request').user
        validated_data['date'] = date
        validated_data['month'] = mon.month

        validated_data['year'] = mon.year

        return super().create(validated_data)
    

class appointment_serializer(serializers.ModelSerializer):
    class Meta:
        model = VendorAppointment
 
        fields = ["id","customer_name","mobile_no","email","services","booking_date","booking_time",]
        extra_kwargs = {'id':{'read_only':True},}
    def create(self,validated_data):
        validated_data['vendor_name'] = self.context.get('request').user
        validated_data['date'] = dt.date.today()
        return super().create(validated_data)
    
class update_appointment_serializer(serializers.Serializer):
    customer_name  = serializers.CharField()
    mobile_no      = serializers.CharField()
    email          = serializers.EmailField()
    services       = serializers.CharField()
    booking_date   = serializers.CharField()
    booking_time   = serializers.CharField()
    # status_pending = serializers.BooleanField()
    # status_completed = serializers.BooleanField()
    # status_cancelled = serializers.BooleanField()
    # date           = serializers.DateField()

    
    

    



    
class service_serializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor_Service
        fields = ["id","service","service_price","service_duration",]
        extra_kwargs = {'id':{'read_only':True},}
    def create(self,validated_data):
        validated_data['user'] = self.context.get('request').user
        return super().create(validated_data)
    
class service_update_serializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor_Service
        fields = ["service","service_price","service_duration",]
    def create(self,validated_data):
        queryset = Vendor_Service.objects.get(id=self.context.get('id'))
        
        queryset.delete()
        queryset = Vendor_Service()


        queryset.service = validated_data.get("service")
        queryset.service_duration = validated_data.get('service_duration')
        queryset.service_price = validated_data.get('service_price')
        queryset.user = self.context.get('request').user
        queryset.save()

        return super().create(validated_data)
    


class service_name_serializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor_Service
        fields = ["id","service",]

class staff_serializer(serializers.ModelSerializer):
    class Meta:
        model = VendorStaff
        fields = ["staff_name","billing_permission","is_user_staff","mobile_no","password","appointment_permission"]

