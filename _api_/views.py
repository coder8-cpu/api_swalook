from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView,RetrieveAPIView,UpdateAPIView,ListAPIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import permission_classes
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json
import io
import requests
from .serializer import *
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
import os
import datetime as dt
from django.shortcuts import render

class VendorSignin(CreateAPIView):

   
    permission_classes = [AllowAny] 
    serializer_class = signup_serializer
    def post(self,request):
        ''' deserialization of register user'''
        serializer_objects           = signup_serializer(request.data)                 # convertion of request.data into python native datatype
        json_data                    = JSONRenderer().render(serializer_objects.data)      # rendering the data into json
        stream_data_over_network     = io.BytesIO(json_data)                                 # streaming the data into bytes
        accept_json_stream           = JSONParser().parse(stream_data_over_network)            # prases json data types data
        ''' passing the json stream data into serializer '''
    
        serializer                   = signup_serializer(data=accept_json_stream,context={'request':request})               # intializing serializer and
        if serializer.is_valid():                                                                   # check if serializer.data is valid 
                                                                                    # all the .validate_fieldname in the serializer will call here
            ''' here the db call happen after accept  '''
            
            serializer.save()                                                       # the create method of serializer call here 
            ''' returning the status and info as response'''
            
           
            return Response({
                'status':True,                                                      # corresponding to ---> 'key:value' for access data
                'user':serializer.validated_data.get('salon_name'),
                'mobileno':serializer.validated_data.get('mobile_no'),
                "text" :  "User_created",

            },)
        return Response({
            'status':False,
             "text": "serializer data is invalid !"
        },)

class vendor_update_profile(APIView):
    permission_classes = [IsAuthenticated]
    def update(self,request):
        serializer_objects           = update_profile_serializer(request.data)                 # convertion of request.data into python native datatype
        json_data                    = JSONRenderer().render(serializer_objects.data)      # rendering the data into json
        stream_data_over_network     = io.BytesIO(json_data)                                 # streaming the data into bytes
        accept_json_stream           = JSONParser().parse(stream_data_over_network)            # prases json data types data
        ''' passing the json stream data into serializer '''
    
        serializer                   = update_profile_serializer(data=accept_json_stream,context={'request':request})               # intializing serializer and
        if serializer.is_valid():                                                                   # check if serializer.data is valid 
                                                                                    # all the .validate_fieldname in the serializer will call here
            ''' here the db call happen after accept  '''
            
            serializer.save()   
        return Response({
                'status':True,                                                      # corresponding to ---> 'key:value' for access data
                'code':302,
                "text" : "User_data_updated",

            },)


class vendor_login(CreateAPIView):

    serializer_class = login_serializer
    permission_classes = [AllowAny]
    def post(self,request):
        ''' deserialization of register user'''
        serializer_objects           = login_serializer(request.data)                 # convertion of request.data into python native datatype
        json_data                    = JSONRenderer().render(serializer_objects.data)      # rendering the data into json
        stream_data_over_network     = io.BytesIO(json_data)                                 # streaming the data into bytes
        accept_json_stream           = JSONParser().parse(stream_data_over_network)            # prases json data types data
        ''' passing the json stream data into serializer '''
    
        serializer                   = login_serializer(data=accept_json_stream,context={"request":request})               # intializing serializer and
        if serializer.is_valid():                                                                   # check if serializer.data is valid 
                                                                                    # all the .validate_fieldname in the serializer will call here
            ''' here the db call happen after accept  '''
            
            serializer.save()                                                       # the create method of serializer call here 
            ''' returning the status and info as response'''
            user = User.objects.get(username=request.user)
            token = Token.objects.get_or_create(user=user)

            


            
           
            return Response({
                'status':True,                                                      # corresponding to ---> 'key:value' for access data
                'code': 302,
                'text' : "login successfull !",
                'token': str(token[0]),
                'user': str(request.user),
                

            },)
        return Response({
            'status':False,
            'code':500,
            'text':'invalid user&pass'
            
        },)


class VendorServices(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        queryset = Vendor_Service.objects.filter(user=request.user).order_by('service')
        serialized_data = service_name_serializer(queryset,many=True)
        
        return Response({
                'status':True,                                                      # corresponding to ---> 'key:value' for access data
                'code':302,
                'service':serialized_data.data
                

            },)
    
class Add_vendor_service(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = service_serializer
    def post(self,request):
        serializer_objects           = service_serializer(request.data)                 # convertion of request.data into python native datatype
        json_data                    = JSONRenderer().render(serializer_objects.data)      # rendering the data into json
        stream_data_over_network     = io.BytesIO(json_data)                                 # streaming the data into bytes
        accept_json_stream           = JSONParser().parse(stream_data_over_network)            # prases json data types data
        ''' passing the json stream data into serializer '''
    
        serializer                   = service_serializer(data=accept_json_stream,context={'request':request})               # intializing serializer and
        if serializer.is_valid():                                                                   # check if serializer.data is valid 
                                                                                    # all the .validate_fieldname in the serializer will call here
            ''' here the db call happen after accept  '''
            
            serializer.save()       

            return Response({
                    'status':True,                                                      # corresponding to ---> 'key:value' for access data
                    'code':302,
                    'text':"service added !"

                    

                },)


class Edit_service(CreateAPIView):    
    permission_classes = [IsAuthenticated]
    serializer_class = service_update_serializer
    def post(self,request,id):
        serializer_objects           = self.serializer_class(request.data)                 # convertion of request.data into python native datatype
        json_data                    = JSONRenderer().render(serializer_objects.data)      # rendering the data into json
        stream_data_over_network     = io.BytesIO(json_data)                                 # streaming the data into bytes
        accept_json_stream           = JSONParser().parse(stream_data_over_network)            # prases json data types data
        ''' passing the json stream data into serializer '''
    
        serializer                   = self.serializer_class(data=accept_json_stream,context={'request':request,"id":id})               # intializing serializer and
        if serializer.is_valid():                                                                   # check if serializer.data is valid 
                                                                                    # all the .validate_fieldname in the serializer will call here
            ''' here the db call happen after accept  '''
            
            serializer.save()       

            return Response({
                    'status':True,                                                      # corresponding to ---> 'key:value' for access data
                    'code':302,
                    'text':"service updated !"

                    

                },)


    
    
class Delete_service(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,id):
        queryset = Vendor_Service.objects.get(id=id)
        queryset.delete()

        return Response({
                'status':True,                                                   
                'service_deleted_id':id,
                

            },)

class Table_service(APIView):
 
    def get(self,request):
        query_set = Vendor_Service.objects.filter(user=request.user).order_by('service')
        serializer_obj = service_serializer(query_set,many=True)
        return Response({
            "status":True,
            "table_data":serializer_obj.data,

        })
class get_slno(APIView):
    def get(self,request):
  
        mon = dt.date.today()
        m_ = mon.month
        y_ = mon.year
      
        v_id = SwalookUserProfile.objects.filter(mobile_no=str(request.user))
        slno = v_id[0].vendor_id.lower() + str(v_id[0].invoice_generated) + str(m_) + str(y_)       
        return Response({
            "slno":slno,    
        })
    
class vendor_billing(CreateAPIView,ListAPIView,):
    permission_classes = [IsAuthenticated]
    serializer_class = billing_serailizer
    def post(self,request):
        ''' deserialization of register user'''
        serializer_objects           = billing_serailizer(request.data)                 # convertion of request.data into python native datatype
        json_data                    = JSONRenderer().render(serializer_objects.data)      # rendering the data into json
        stream_data_over_network     = io.BytesIO(json_data)                                 # streaming the data into bytes
        accept_json_stream           = JSONParser().parse(stream_data_over_network)            # prases json data types data
        ''' passing the json stream data into serializer '''
    
        serializer                   = billing_serailizer(data=accept_json_stream,context={'request':request})               # intializing serializer and
        if serializer.is_valid():                                                                   # check if serializer.data is valid 
                                                                                    # all the .validate_fieldname in the serializer will call here
            ''' here the db call happen after accept  '''
            
            serializer.save()                                                       # the create method of serializer call here 
            ''' returning the status and info as response'''
            return Response({
            "status":True,
            'slno':serializer.data.get('slno'),
            
            

        })
    
    def list(self,request):
      
        query_set = VendorInvoice.objects.filter(vendor_name=request.user)[::-1]
        query_set_salon_name = SwalookUserProfile.objects.get(mobile_no=str(request.user))
        serializer_obj = billing_serailizer(query_set,many=True)
        return Response({
            "status":True,
            "table_data":serializer_obj.data,
            "salon_name":query_set_salon_name.salon_name,

        })

class VendorAppointments(CreateAPIView,ListAPIView,):
    permission_classes = [IsAuthenticated]
    serializer_class = appointment_serializer
    def post(self,request):
        ''' deserialization of register user'''
        serializer_objects           = appointment_serializer(request.data)                 # convertion of request.data into python native datatype
        json_data                    = JSONRenderer().render(serializer_objects.data)      # rendering the data into json
        stream_data_over_network     = io.BytesIO(json_data)                                 # streaming the data into bytes
        accept_json_stream           = JSONParser().parse(stream_data_over_network)            # prases json data types data
        ''' passing the json stream data into serializer '''
    
        serializer                   = appointment_serializer(data=accept_json_stream,context={"request":request})               # intializing serializer and
        if serializer.is_valid():                                                                   # check if serializer.data is valid 
                                                                                    # all the .validate_fieldname in the serializer will call here
            ''' here the db call happen after accept  '''
            
            serializer.save()                                                       # the create method of serializer call here 
            ''' returning the status and info as response'''
            return Response({
                "status":True,
            

            })
        return Response({
            "status":False,
            

            })
    
    def list(self,request):
        query_set = VendorAppointment.objects.filter(vendor_name=request.user)[::-1]
        serializer_obj = appointment_serializer(query_set,many=True)
        return Response({
            "status":True,
            "table_data":serializer_obj.data,

        })
   

class edit_appointment(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request,id):
         
        accept_json_stream           =  request.data       

        queryset = VendorAppointment.objects.get(id=id)
        
        queryset.delete()
        queryset = VendorAppointment()
        queryset.customer_name =     accept_json_stream.get('customer_name')
        queryset.mobile_no     =     accept_json_stream.get('mobile_no')
        queryset.email         =     accept_json_stream.get('email')
        queryset.services      =     accept_json_stream.get('services')
        queryset.booking_time  =     accept_json_stream.get('booking_time')
        queryset.booking_date  =     accept_json_stream.get('booking_date')
        # queryset.status_pending    = accept_json_stream.get('status_pending')
        # queryset.status_completed =  accept_json_stream.get('status_completed')
        # queryset.status_canceled  =  accept_json_stream.get('status_cancelled')
        queryset.date =  dt.date.today()
        queryset.vendor_name = request.user
        queryset.save()  

        return Response({
                    'status':True,                                                      # corresponding to ---> 'key:value' for access data
                    'code':302,
                    'text':"appointment update!"

                

        },)
        
        
    

class delete_appointment(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,id):
        queryset = VendorAppointment.objects.get(id=id)
        
        queryset.delete()
        return Response({
            "status":True,
            'code':302,
            "appointment_deleted_id":id,
          
        })

class present_day_appointment(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        date = dt.date.today()
        query_set = VendorAppointment.objects.filter(vendor_name=request.user,date=date).order_by("booking_time")
        serializer_obj = appointment_serializer(query_set,many=True)
        return Response({

            "status":True,
            "table_data":serializer_obj.data,
        })
    
class get_specific_appointment(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,id):
        date = dt.date.today()
        query_set = VendorAppointment.objects.filter(id=id)
        serializer_obj = appointment_serializer(query_set,many=True)
        return Response({

            "status":True,
            "single_appointment_data":serializer_obj.data,
        })
    

    


class showendpoint(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        return Response({
            "status":True,

            "endpoint 01":'api/swalook/endpoints/',
            # "endpoint 02":'swalook_token_ii091/', 
            # "endpoint 03":'swalook_token_ii091/refresh/',
            "endpoint 04":'api/swalook/create_account/',
            "endpoint 05":'api/swalook/login/',
            "endpoint 06":'api/swalook/billing/',
            "endpoint 07":'api/swalook/appointment/',
            "endpoint 08":'api/swalook/edit/appointment/<id>/',
            "endpoint 09":'api/swalook/delete/appointment/<id>/',
            "endpoint 10":'api/swalook/preset-day-appointment/',
            "endpoint 11":'api/swalook/services/',
            "endpoint 12":'api/swalook/add/services/',
            "endpoint 13":'api/swalook/delete/services/',
            "endpoint 14":'api/swalook/edit/services/',
            "endpoint 15":'api/swalook/get_specific/appointment/<id>',
            "endpoint 16":'api/swalook/table/services/',

            
        })


import subprocess

class update_files_pull(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        # Replace '/path/to/your/command' with the actual command you want to run
        command = ['git','pull']
        
        try:
            # Execute the command using subprocess
            result = subprocess.run(command, capture_output=True, text=True, check=True)
            output = result.stdout
        except subprocess.CalledProcessError as e:
            # Handle any errors that occur during command execution
            output = f"Error: {e.stderr}"
        return Response({
            "server updated" : output,
        })
    
class restart_server(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        # Replace '/path/to/your/command' with the actual command you want to run
        os.chdir("/root/api_swalook/Swalook-master/")
        command = ['npm','run','build']
        command2 = ['PORT=80','serve','-s','build']
        

        
        try:
            # Execute the command using subprocess
            result = subprocess.run(command, capture_output=True, text=True, check=True)
            output = result.stdout
            result_ = subprocess.run(command, capture_output=True, text=True, check=True)
            output_ = result_.stdout
            return Response({
            "server build status" : output,
            "server running" : output_,
            "status": True,
            })
        except subprocess.CalledProcessError as e:
            # Handle any errors that occur during command execution
            output = f"Error: {e.stderr}"
            return Response({
            "error":output,
            "status": False,
            })

class get_current_user_profile(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,id):
        data = SwalookUserProfile.objects.get(mobile_no=id)
        return Response({
            "status":True,
            "current_user_data": data,

        })
