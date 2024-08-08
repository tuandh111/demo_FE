app.controller('AdminDoctorController', function ($scope, $http, $rootScope, $location,$timeout) {
    let url = "http://localhost:8081/api/v1/auth"
    let headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
    }
    //code here
    $scope.listDegreesTypeDB = [
        { degreesId: 1, degreesName: 'Thạc sĩ' },
        { degreesId: 2, degreesName: 'Tiến sĩ' },
        { degreesId: 3, degreesName: 'Bác sĩ' },
        { degreesId: 4, degreesName: 'Giáo sư' },
        { degreesId: 5, degreesName: 'Y tá' },
        { degreesId: 6, degreesName: 'Y sĩ' },
        // Các chuyên khoa khác trong nha khoa
    ];

    $scope.listSpecialtyTypeDB = [
        { specialtyId: 1, specialtyName: 'Răng hàm mặt' },
        { specialtyId: 2, specialtyName: 'Nha sĩ tổng quát' },
        { specialtyId: 3, specialtyName: 'Nha sĩ trẻ em' },
        { specialtyId: 4, specialtyName: 'Trồng răng' },
        { specialtyId: 5, specialtyName: 'Chỉnh nha' },
        // Thêm các chuyên khoa khác tương tự nếu cần
    ];

    $scope.listGenderTypeDB = [
        { genderId: 'male', genderName: 'Nam' },
        { genderId: 'female', genderName: 'Nữ' },
        { genderId: 'other', genderName: 'Khác' }
    ];
   
    $scope.crudDoctor = () => {
        var currentDate = new Date();
        $scope.formDoctor={
            image:'',
            doctorId:-1,
            fullName:'',
            degrees:'',
            specialtyId:'',
            phoneNumber:'',
            gender:'',
            address:'',
            birthday:''
        }
        $scope.checkAge = function(dateOfBirth) {
            if (!dateOfBirth) return false; 
    
            var birthDate = new Date(dateOfBirth);
            var age = currentDate.getFullYear() - birthDate.getFullYear();
            if (currentDate.getMonth() < birthDate.getMonth() || 
                (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }  
            return age >= 18;
        };

        $scope.validateBirthday = function() {
            return $scope.checkAge($scope.formDoctor.birthday);
        };
        $scope.$watch('formDoctor.birthday', function(newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.validateBirthday();
            }
        });
        $scope.validationForm=()=>{
            if ($scope.formDoctor.degrees == "") {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Vui lòng chọn bằng cấp!",
                    icon: "error"
                })
                return
            }
            if ($scope.formDoctor.specialtyId == "") {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Vui lòng chọn chuyên khoa!",
                    icon: "error"
                })
                return
            }
            if ($scope.formDoctor.gender == "") {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Vui lòng chọn giới tính!",
                    icon: "error"
                })
                return
            }
            if ($scope.formDoctor.fullName == "") {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Vui lòng nhập họ tên!",
                    icon: "error"
                })
                return
            }
            if(!$scope.validateBirthday()){
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Ngày sinh phải đủ 18 tuổi!",
                    icon: "error"
                })
                return
            }
        }

        $scope.createDoctor=() => {
            $scope.validationForm()
            var requsetDoctorJSON = angular.toJson($scope.formDoctor)
            console.log("requsetDoctorJSON",requsetDoctorJSON);
            $http.post(url+'/doctor',requsetDoctorJSON).then(respone=>{
                Swal.fire({
                    title: "Thành công!",
                    html: "Đã thêm bác sĩ thành công!",
                    icon: "success"
                })
                $scope.resetForm()
            }).catch(err=>{
                Swal.fire({
                    title: "Thất bại!",
                    html: '<p class="text-danger">Xảy ra lỗi!</p>',
                    icon: "error"
                })
            });
        }

        $scope.updateDoctor=() => {

        }
        $scope.deleteDoctor=() => {

        }

        $scope.resetForm=() => {
            $scope.formDoctor={
                image:'',
                doctorId:-1,
                fullName:'',
                degrees:'',
                specialtyId:'',
                phoneNumber:'',
                gender:'',
                address:'',
                birthday:''
            }
        }
    }


    $timeout(function() {
        $('#dataTable-list-doctor').DataTable({
            autoWidth: true,
            "lengthMenu": [
                [16, 32, 64, -1],
                [16, 32, 64, "All"]
            ],
            language: {
                sProcessing: "Đang xử lý...",
                sLengthMenu: "Hiển thị _MENU_ mục",
                sZeroRecords: "Không tìm thấy dòng nào phù hợp",
                sInfo: "Đang hiển thị _START_ đến _END_ trong tổng số _TOTAL_ mục",
                sInfoEmpty: "Đang hiển thị 0 đến 0 trong tổng số 0 mục",
                sInfoFiltered: "(được lọc từ _MAX_ mục)",
                sInfoPostFix: "",
                sSearch: "Tìm kiếm:",
                sUrl: "",
                oPaginate: {
                    sFirst: "Đầu",
                    sPrevious: "Trước",
                    sNext: "Tiếp",
                    sLast: "Cuối"
                }
            }
        });
    }, 0);

    $scope.crudDoctor()
})