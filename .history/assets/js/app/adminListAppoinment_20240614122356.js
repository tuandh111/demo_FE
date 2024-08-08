app.controller('AdminListAppoinment', function ($scope, $http, $rootScope, $location,$timeout) {
    let url = "http://localhost:8081/api/v1/auth"
    let headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
    }
    //code here
    $scope.currentTab = null;
    $scope.selectTab=(tab,$event)=>{
        $event.preventDefault()
        $scope.currentTab = tab;
    }
    $scope.isSelected = (tab) => {
        return $scope.currentTab === tab;
      };
      $scope.getListDoctor=()=>{
        $http.get(url+'/doctor').then(respone=>{
            $scope.listDoctorDB=respone.data   
            console.log("$scope.listDoctorDB",$scope.listDoctorDB);       
        }).catch(err=>{
            console.log("Error", err);
        })
       }
    $timeout(function() {
        $('#dataTable-list-appoinment').DataTable({
            autoWidth: true,
            "lengthMenu": [
                [16, 32, 64, -1],
                [16, 32, 64, "All"]
            ]
        });
    }, 0);

    $scope.getListDoctor()
})